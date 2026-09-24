'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Reveal from "@/components/Reveal";
import { Loader2, Download, ArrowLeft, Printer, User } from 'lucide-react';

const API_BASE_URL = 'https://serverless-jet-ten.vercel.app'; 

// ✅ Helper to build student photo URL (Ported from admin code)
const buildStudentPhotoUrl = (student) => {
    if (!student) return null;

    // 1. profileImage as object with 'url'
    if (student.profileImage?.url) {
        const imageUrl = student.profileImage.url;
        if (imageUrl.startsWith('http')) return imageUrl;
        if (imageUrl.startsWith('/')) return `${API_BASE_URL}${imageUrl}`;
        return `${API_BASE_URL}/${imageUrl}`;
    }

    // 2. profileImage as direct string
    if (typeof student.profileImage === 'string' && student.profileImage.trim() !== '') {
        const imageUrl = student.profileImage;
        if (imageUrl.startsWith('http')) return imageUrl;
        if (imageUrl.startsWith('/')) return `${API_BASE_URL}${imageUrl}`;
        return `${API_BASE_URL}/${imageUrl}`;
    }

    // 3. Final fallback: construct from student ID
    const studentId = student.id;
    if (studentId != null) {
        return `${API_BASE_URL}/uploads/students/${studentId}/profile-image`;
    }

    return null;
};

// ✅ Student Photo Component (Ported from admin code)
const StudentPhotoPrint = ({ src, studentName }) => {
    const [imgError, setImgError] = React.useState(false);

    if (!src || imgError) {
        return (
            <div className="w-[80px] h-[96px] border-2 border-gray-400 bg-gray-50 flex items-center justify-center rounded-sm">
                <User className="w-8 h-8 text-gray-300" />
            </div>
        );
    }

    return (
        <div className="w-[80px] h-[96px] border-2 border-gray-800 bg-gray-50 rounded-sm overflow-hidden">
            <img
                src={src}
                alt={`${studentName}'s Photo`}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
            />
        </div>
    );
};

export default function ResultCheckerPage() {
    const [formData, setFormData] = useState({
        schoolCode: 'fountainhills',
        admissionNumber: '',
        pin: ''
    });
    const [loading, setLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [resultData, setResultData] = useState(null);
    
    // ✅ NEW: State for public school information
    const [siteInfo, setSiteInfo] = useState(null);

    const printRef = useRef(null);

    // ✅ NEW: Fetch public site info on component mount
    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/public/site-info`);
                const data = await response.json();
                if (data.success && data.data) {
                    setSiteInfo(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch site info:", err);
            }
        };
        fetchSiteInfo();
    }, []);

    // ✅ NEW: Determine logo URL dynamically
    const logoUrl = useMemo(() => {
        if (siteInfo?.schoolLogo?.url) {
            const u = siteInfo.schoolLogo.url;
            return u.startsWith('http') ? u : `${API_BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`;
        }
        if (typeof siteInfo?.schoolLogo === 'string') {
            const u = siteInfo.schoolLogo;
            return u.startsWith('http') ? u : `${API_BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`;
        }
        return "/logo.jpeg"; // Fallback
    }, [siteInfo]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckResult = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResultData(null);

        try {
            const response = await fetch(`${API_BASE_URL}/public/check-result`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to check result. Please try again.');
            }
            
            setResultData(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => date
        ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = async () => {
        const element = printRef.current;
        if (!element || !resultData) return;

        setIsGenerating(true);
        try {
            const html2canvas = (await import('html2canvas-pro')).default;
            const { jsPDF } = await import('jspdf');
            
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            const fileName = `Report_Card_${resultData.student?.lastName || 'Student'}_${resultData.student?.firstName || ''}.pdf`;
            pdf.save(fileName);
            
        } catch (err) {
            console.error('Error generating PDF:', err);
            alert('Failed to generate PDF. Please try the Print option instead.');
        } finally {
            setIsGenerating(false);
        }
    };

    const totalScoreObtained = resultData?.results?.reduce((acc, curr) => acc + (curr.totalScore || 0), 0) || 0;
    const averageScore = resultData?.results?.length > 0 ? (totalScoreObtained / resultData.results.length).toFixed(1) : '0.0';
    const totalScoreObtainable = (resultData?.results?.length || 0) * 100;

    const defaultPsychomotor = useMemo(() => [
        { skill: 'Handwriting' }, { skill: 'Sports' }, { skill: 'Drawing & Painting' }, { skill: 'Music & Drama' },
        { skill: 'Crafts' }, { skill: 'Cleanliness' }, { skill: 'Punctuality' }, { skill: 'Politeness' },
    ], []);

    // ✅ Build student photo URL and full name
    const studentPhotoUrl = resultData ? buildStudentPhotoUrl(resultData.student) : null;
    const studentFullName = resultData ? `${resultData.student?.firstName ?? ''} ${resultData.student?.lastName ?? ''}`.trim() : '';

    return (
        <div className="w-full overflow-x-hidden">
            {/* HERO HEADER */}
            <div className="bg-[#1a365d] text-white py-24 text-center relative overflow-hidden print:hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-c8a05bf9d5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold tracking-tight">Result Checker</h1>
                    <div className="w-20 h-1 bg-[#c9952b] mx-auto mt-6 rounded-full"></div>
                    <p className="mt-6 text-lg text-blue-100">Enter your details to view your academic report card</p>
                </div>
            </div>

            {/* MAIN CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                
                {/* RESULT DISPLAY VIEW */}
                {resultData ? (
                    <div className="flex flex-col items-center">
                        {/* SCREEN CONTROLS */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8 w-full max-w-4xl print:hidden">
                            <button 
                                onClick={() => setResultData(null)}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1a365d] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4" /> Back
                            </button>
                            <button 
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1a365d] rounded-lg hover:bg-[#2c5282] transition-colors shadow-sm"
                            >
                                <Printer className="h-4 w-4" /> Print
                            </button>
                            <button 
                                onClick={handleDownloadPDF}
                                disabled={isGenerating}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2c5282] rounded-lg hover:bg-[#1a365d] transition-colors shadow-sm disabled:opacity-70"
                            >
                                {isGenerating ? (
                                    <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                                ) : (
                                    <><Download className="h-4 w-4" /> Download PDF</>
                                )}
                            </button>
                        </div>

                        <div className="w-full max-w-4xl bg-amber-50 border border-amber-300 text-amber-800 text-center font-bold py-3 rounded-lg mb-8 print:hidden">
                            {resultData.trialsLeft > 0 
                                ? `You have ${resultData.trialsLeft} view(s) left for this PIN.`
                                : `This was your last view. Your PIN has now expired.`
                            }
                        </div>

                        {/* ✅ PREMIUM A4 DOCUMENT (Pure Tailwind) */}
                        <Reveal className="w-full flex justify-center">
                            <div 
                                ref={printRef} 
                                className="w-full max-w-[800px] bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-100 print:max-w-none print:w-full print:p-0 print:shadow-none print:border-0"
                            >
                                
                                {/* ===== 3-COLUMN HEADER (Logo | Info | Photo) ===== */}
                                <header className="relative pb-4 mb-4">
                                    <div className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#c9952b] to-transparent mb-3"></div>
                                    
                                    <div className="flex justify-between items-start gap-4">
                                        {/* LEFT - School Logo */}
                                        <div className="w-16 h-16 flex-shrink-0 pt-1">
                                            <img src={logoUrl} alt="School Logo" width={64} height={64} className="rounded-full border-2 border-[#c9952b] shadow-sm object-contain w-16 h-16" />
                                        </div>

                                        {/* CENTER - School Info */}
                                        <div className="flex-1 text-center min-w-0">
                                            <h1 className="text-lg font-bold uppercase tracking-wide text-[#1a365d]" style={{ fontFamily: 'Georgia, serif' }}>
                                                {siteInfo?.schoolName?.toUpperCase() || 'FOUNTAIN HILLS SCHOOLS'}
                                            </h1>
                                            {siteInfo?.schoolMotto && (
                                                <p className="text-[9px] italic text-gray-500 mt-0.5">"{siteInfo.schoolMotto}"</p>
                                            )}
                                            <p className="text-[10px] text-gray-600 mt-1">
                                                {siteInfo ? `${siteInfo.address || ''}${siteInfo.state ? ', ' + siteInfo.state : ''}${siteInfo.country ? ', ' + siteInfo.country : ''}`.trim() : '123 Education Avenue, Lagos, Nigeria'}
                                            </p>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#c9952b] mt-2">STUDENT ACADEMIC REPORT CARD</h2>
                                            <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-1 mt-2 text-[11px] text-gray-600">
                                                <span>Term: <strong className="text-[#1a365d]">{resultData.term?.name || 'N/A'}</strong></span>
                                                <span className="w-px h-3 bg-gray-300"></span>
                                                <span>Session: <strong className="text-[#1a365d]">{resultData.session?.name || 'N/A'}</strong></span>
                                            </div>
                                        </div>

                                        {/* RIGHT - Student Photo */}
                                        <div className="flex-shrink-0 pt-1">
                                            <StudentPhotoPrint src={studentPhotoUrl} studentName={studentFullName} />
                                        </div>
                                    </div>

                                    <div className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#c9952b] to-transparent mt-3"></div>
                                </header>

                                {/* ===== BIO DATA ===== */}
                                <section className="grid grid-cols-2 gap-x-5 gap-y-2 bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">Name of Student</span>
                                        <span className="text-sm font-bold text-[#1a365d]">{resultData.student?.lastName} {resultData.student?.firstName}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">Admission No.</span>
                                        <span className="text-sm font-bold text-gray-900">{resultData.student?.admissionNumber || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">Class</span>
                                        <span className="text-sm font-bold text-gray-900">{resultData.student?.className || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">Gender</span>
                                        <span className="text-sm font-bold text-gray-900">{resultData.student?.gender || 'N/A'}</span>
                                    </div>
                                </section>

                                {/* ===== GRADES TABLE ===== */}
                                <div className="my-4 overflow-x-auto">
                                    <table className="w-full border-collapse text-xs min-w-[680px] table-fixed">
                                        <thead>
                                            <tr className="bg-[#1a365d] text-white">
                                                <th rowSpan="2" className="p-1.5 border border-white/20 w-8 text-[10px]">S/N</th>
                                                <th rowSpan="2" className="p-1.5 border border-white/20 text-left text-[10px]">SUBJECTS</th>
                                                <th colSpan="4" className="p-1.5 border border-white/20 text-center bg-[#2c5282] text-[9px]">CONTINUOUS ASSESSMENT (40)</th>
                                                <th rowSpan="2" className="p-1.5 border border-white/20 w-12 text-[10px]">EXAM<br/>(60)</th>
                                                <th rowSpan="2" className="p-1.5 border border-white/20 w-12 text-[10px]">TOTAL<br/>(100)</th>
                                                <th rowSpan="2" className="p-1.5 border border-white/20 w-10 text-[10px]">GRADE</th>
                                                <th rowSpan="2" className="p-1.5 border border-white/20 text-left text-[10px]">REMARK</th>
                                            </tr>
                                            <tr className="bg-[#2c5282] text-white">
                                                <th className="p-1 border border-white/20 text-[8px]">Test<br/>(20)</th>
                                                <th className="p-1 border border-white/20 text-[8px]">Notes<br/>(10)</th>
                                                <th className="p-1 border border-white/20 text-[8px]">Assign<br/>(10)</th>
                                                <th className="p-1 border border-white/20 text-[8px]">Total<br/>(40)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resultData.results?.map((sub, i) => (
                                                <tr key={i} className="even:bg-gray-50">
                                                    <td className="p-1.5 border border-gray-200 text-center text-gray-700">{i + 1}</td>
                                                    <td className="p-1.5 border border-gray-200 text-left font-semibold text-gray-900 truncate">{sub.subject?.name || 'N/A'}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center text-gray-700">{sub.testScore}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center text-gray-700">{sub.noteTakingScore}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center text-gray-700">{sub.assignmentScore}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center font-bold text-gray-900">{sub.totalCA}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center font-bold text-gray-900">{sub.examScore}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center font-extrabold text-[#1a365d] bg-blue-50">{sub.totalScore}</td>
                                                    <td className="p-1.5 border border-gray-200 text-center font-bold text-[#1a365d]">{sub.grade}</td>
                                                    <td className="p-1.5 border border-gray-200 text-left text-[10px] italic text-gray-500 truncate">{sub.remark}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr className="bg-gray-100 font-bold">
                                                <td colSpan="7" className="p-1.5 border border-gray-300 text-right text-[10px] uppercase text-gray-900">TOTAL SCORE OBTAINABLE:</td>
                                                <td className="p-1.5 border border-gray-300 text-center text-[#1a365d]">{totalScoreObtainable}</td>
                                                <td colSpan="2"></td>
                                            </tr>
                                            <tr className="bg-gray-100 font-bold">
                                                <td colSpan="7" className="p-1.5 border border-gray-300 text-right text-[10px] uppercase text-gray-900">TOTAL SCORE OBTAINED:</td>
                                                <td className="p-1.5 border border-gray-300 text-center text-[#1a365d]">{totalScoreObtained}</td>
                                                <td colSpan="2"></td>
                                            </tr>
                                            <tr className="bg-gray-100 font-bold">
                                                <td colSpan="7" className="p-1.5 border border-gray-300 text-right text-[10px] uppercase text-gray-900">STUDENT AVERAGE:</td>
                                                <td className="p-1.5 border border-gray-300 text-center text-[#1a365d]">{averageScore}%</td>
                                                <td colSpan="2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                {/* ===== GRADING KEY ===== */}
                                <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-[#c9952b] rounded-sm mb-4 flex-wrap">
                                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#1a365d]">GRADING SCALE:</span>
                                    <span className="text-[11px] text-gray-600">A (Excellent) | B (Very Good) | C (Good) | D (Fair) | E (Poor) | F (Fail)</span>
                                </div>

                                {/* ===== ATTENDANCE ===== */}
                                <section className="my-4">
                                    <div className="inline-block text-[11px] font-bold uppercase tracking-wide text-[#1a365d] border-b-2 border-[#c9952b] pb-1 mb-2">ATTENDANCE RECORD</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-center">
                                            <span className="text-[9px] font-semibold uppercase text-gray-500">No. of Times School Opened</span>
                                            <span className="text-xl font-extrabold text-[#1a365d]" style={{ fontFamily: 'Courier New, monospace' }}>––––</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-center">
                                            <span className="text-[9px] font-semibold uppercase text-gray-500">No. of Times Present</span>
                                            <span className="text-xl font-extrabold text-green-600" style={{ fontFamily: 'Courier New, monospace' }}>––––</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-lg text-center">
                                            <span className="text-[9px] font-semibold uppercase text-gray-500">No. of Times Absent</span>
                                            <span className="text-xl font-extrabold text-red-600" style={{ fontFamily: 'Courier New, monospace' }}>––––</span>
                                        </div>
                                    </div>
                                </section>

                                {/* ===== PSYCHOMOTOR ===== */}
                                <section className="my-4">
                                    <div className="inline-block text-[11px] font-bold uppercase tracking-wide text-[#1a365d] border-b-2 border-[#c9952b] pb-1 mb-1">PSYCHOMOTOR / AFFECTIVE DOMAIN</div>
                                    <div className="text-[9px] text-gray-500 mb-2">Rating Key: <strong>A</strong> – Excellent | <strong>B</strong> – Very Good | <strong>C</strong> – Good | <strong>D</strong> – Fair | <strong>E</strong> – Poor</div>
                                    <table className="w-full border-collapse text-[11px]">
                                        <thead>
                                            <tr className="bg-[#1a365d] text-white">
                                                <th className="p-1 border border-white/20 w-8 text-[9px]">S/N</th>
                                                <th className="p-1 border border-white/20 text-left text-[9px]">Skill / Trait</th>
                                                <th className="p-1 border border-white/20 w-12 text-[9px]">Rating</th>
                                                <th className="p-1 border border-white/20 w-8 text-[9px]">S/N</th>
                                                <th className="p-1 border border-white/20 text-left text-[9px]">Skill / Trait</th>
                                                <th className="p-1 border border-white/20 w-12 text-[9px]">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                const half = Math.ceil(defaultPsychomotor.length / 2);
                                                const L = defaultPsychomotor.slice(0, half), R = defaultPsychomotor.slice(half);
                                                return Array.from({ length: Math.max(L.length, R.length) }, (_, idx) => (
                                                    <tr key={idx} className="even:bg-gray-50">
                                                        <td className="p-1 border border-gray-200 text-center text-gray-600 font-semibold">{idx + 1}</td>
                                                        <td className="p-1 border border-gray-200 text-left font-medium text-gray-800">{L[idx]?.skill || ''}</td>
                                                        <td className="p-1 border border-gray-200 text-center">
                                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1a365d] text-white font-bold text-[9px]">–</span>
                                                        </td>
                                                        <td className="p-1 border border-gray-200 text-center text-gray-600 font-semibold">{half + idx + 1}</td>
                                                        <td className="p-1 border border-gray-200 text-left font-medium text-gray-800">{R[idx]?.skill || ''}</td>
                                                        <td className="p-1 border border-gray-200 text-center">
                                                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1a365d] text-white font-bold text-[9px]">–</span>
                                                        </td>
                                                    </tr>
                                                ));
                                            })()}
                                        </tbody>
                                    </table>
                                </section>

                                {/* ===== COMMENTS & SIGNATURES ===== */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                                    <div className="p-3 border border-gray-300 rounded-lg bg-white flex flex-col gap-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wide text-[#1a365d] border-b border-gray-200 pb-1">CLASS TEACHER'S COMMENT</div>
                                        <div className="text-xs text-gray-900 leading-relaxed flex-grow min-h-[36px]">
                                            {resultData.classTeacherComment?.comment ? (
                                                <><strong className="text-[#1a365d]">{resultData.student?.lastName} {resultData.student?.firstName}</strong> — {resultData.classTeacherComment.comment}</>
                                            ) : (
                                                <span className="text-gray-300 tracking-widest">................................................................................</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-0.5 mt-1">
                                            <div className="w-24 h-px bg-black"></div>
                                            <span className="text-[9px] font-bold uppercase text-gray-500">Class Teacher</span>
                                        </div>
                                    </div>
                                    <div className="p-3 border border-gray-300 rounded-lg bg-white flex flex-col gap-2">
                                        <div className="text-[10px] font-bold uppercase tracking-wide text-[#1a365d] border-b border-gray-200 pb-1">PRINCIPAL/ HEADTEACHER'S COMMENT</div>
                                        <div className="text-xs text-gray-900 leading-relaxed flex-grow min-h-[36px]">
                                            {resultData.principalComment?.comment ? (
                                                <>{resultData.principalComment.comment}</>
                                            ) : (
                                                <span className="text-gray-300 tracking-widest">................................................................................</span>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-0.5 mt-1">
                                            <div className="w-24 h-px bg-black"></div>
                                            <span className="text-[9px] font-bold uppercase text-gray-500">Principal/Headteacher</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== FOOTER ===== */}
                                <footer className="mt-4 pt-2 border-t-2 border-double border-[#1a365d]">
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[9px] font-semibold uppercase text-gray-500">Term Begins:</span>
                                            <span className="text-xs font-bold text-gray-900">{formatDate(resultData.term?.startDate)}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[9px] font-semibold uppercase text-gray-500">Term Ends:</span>
                                            <span className="text-xs font-bold text-gray-900">{formatDate(resultData.term?.endDate)}</span>
                                        </div>
                                    </div>
                                    {resultData.term?.nextTermBegins && (
                                        <div className="flex items-center justify-center gap-2 p-2 bg-[#1a365d] text-white rounded-lg">
                                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-90">NEXT TERM BEGINS:</span>
                                            <span className="text-sm font-extrabold tracking-wide">{formatDate(resultData.term.nextTermBegins)}</span>
                                        </div>
                                    )}
                                    
                                    {/* ✅ NEW: Dynamic School Contact Info */}
                                    <div className="mt-3 text-center text-[9px] text-gray-500 flex flex-wrap justify-center gap-x-3 gap-y-1">
                                        {siteInfo?.phoneNumber && <span>Tel: {siteInfo.phoneNumber}</span>}
                                        {siteInfo?.email && <span>Email: {siteInfo.email}</span>}
                                        {siteInfo?.website && <span>Web: {siteInfo.website}</span>}
                                    </div>
                                </footer>

                            </div>
                        </Reveal>
                    </div>

                ) : (
                    /* FORM INPUT VIEW */
                    <div className="flex justify-center">
                        <Reveal className="w-full max-w-md">
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-[#1a365d] px-8 pt-8 pb-6 text-center">
                                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Result Checker</h2>
                                    <div className="w-16 h-1 bg-[#c9952b] mx-auto mt-4 rounded-full"></div>
                                </div>
                                
                                <form className="p-8 space-y-6" onSubmit={handleCheckResult}>
                                    {error && (
                                        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                                            <span>⚠️</span> <span>{error}</span>
                                        </div>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Admission Number</label>
                                        <input 
                                            type="text" 
                                            name="admissionNumber" 
                                            value={formData.admissionNumber} 
                                            onChange={handleChange} 
                                            required 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] outline-none transition-all"
                                            placeholder="e.g. SCH001"
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">Result PIN</label>
                                        <input 
                                            type="text" 
                                            name="pin" 
                                            value={formData.pin} 
                                            onChange={handleChange} 
                                            required 
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-[#1a365d] outline-none transition-all"
                                            placeholder="Enter your 8-character PIN"
                                        />
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="w-full bg-[#c9952b] text-[#1a365d] font-extrabold py-3.5 rounded-lg hover:bg-[#f6e5a3] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
                                    >
                                        {loading ? (
                                            <span className="w-5 h-5 border-2 border-[#1a365d] border-t-transparent rounded-full animate-spin"></span>
                                        ) : (
                                            '🔍 View Result'
                                        )}
                                    </button>
                                </form>
                                
                                <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-500 border-t border-gray-100">
                                    <strong>Note:</strong> You have a maximum of <strong>5 views</strong> per PIN.
                                </div>
                            </div>
                        </Reveal>
                    </div>
                )}
            </div>
        </div>
    );
}
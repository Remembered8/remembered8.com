import React, { useState, useRef } from 'react';
import { MemorialProfile, AudioStory, VideoStory } from '../types';
import { Play, Pause, Mic, Square, Video, Clock, CheckCircle2 } from 'lucide-react';

interface VoiceArchiveSectionProps {
  memorial: MemorialProfile;
  onAddAudioStory: (story: AudioStory) => void;
  onAddVideoStory: (video: VideoStory) => void;
}

export const VoiceArchiveSection: React.FC<VoiceArchiveSectionProps> = ({
  memorial,
  onAddAudioStory,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoStory | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // Modal states
  const [showVoiceRecordModal, setShowVoiceRecordModal] = useState(false);
  const [voiceTitle, setVoiceTitle] = useState('');
  const [voiceYear, setVoiceYear] = useState('');
  const [voiceDesc, setVoiceDesc] = useState('');

  // Audio Playback simulation / speech synthesis
  const togglePlayAudio = (audio: AudioStory) => {
    if (playingId === audio.id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setPlayingId(null);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setPlayingId(audio.id);

      // Play soft simulated speech/ambience narration of the voice memory description
      if ('speechSynthesis' in window) {
        const text = `${audio.title}. ${audio.description}`;
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'en-US';
        utter.rate = 0.9;
        utter.pitch = 0.92;
        utter.onend = () => setPlayingId(null);
        utter.onerror = () => setPlayingId(null);
        window.speechSynthesis.speak(utter);
      } else {
        setTimeout(() => setPlayingId(null), 5000);
      }
    }
  };

  // Start Web Audio Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access error:', err);
    }
  };

  // Stop Web Audio Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const handleSaveVoiceMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceTitle.trim()) return;

    const newStory: AudioStory = {
      id: `audio-${Date.now()}`,
      title: voiceTitle.trim(),
      year: voiceYear.trim() || new Date().getFullYear().toString(),
      duration: `${Math.floor(recordingSeconds / 60)}:${(recordingSeconds % 60).toString().padStart(2, '0')}` || '01:30',
      description: voiceDesc.trim() || 'Oral testimony and voice chronicle preserved by user.',
      audioUrl: recordedAudioUrl || undefined,
    };

    onAddAudioStory(newStory);
    setShowVoiceRecordModal(false);
    setVoiceTitle('');
    setVoiceYear('');
    setVoiceDesc('');
    setRecordedAudioUrl(null);
  };

  return (
    <section id="voice" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#111111] border-b border-[#111111]/20">
      <div className="space-y-6">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#111111] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">
              SECTION IV &bull; ORAL HISTORY & PHONOTEQUE
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-bold">
              Voice Chronicles & Spoken Testimonies
            </h2>
            <p className="text-xs font-serif italic text-[#555555] mt-0.5">
              While photographs capture a single moment, a human voice endures as the most vivid living presence across time.
            </p>
          </div>

          <button
            onClick={() => setShowVoiceRecordModal(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition self-start sm:self-auto cursor-pointer"
            id="record-voice-btn"
          >
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span>Record Oral Testimony</span>
          </button>
        </div>

        {/* Audio Recordings Grid */}
        {memorial.audioRecordings && memorial.audioRecordings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {memorial.audioRecordings.map((audio) => {
              const isPlaying = playingId === audio.id;

              return (
                <div
                  key={audio.id}
                  className="p-5 bg-white border border-[#111111]/20 hover:border-[#111111] transition shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="px-2 py-0.5 bg-[#111111] text-white text-[10px] font-mono uppercase tracking-wider">
                        {audio.year || 'ARCHIVE'}
                      </span>
                      <span className="text-xs text-[#777777] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#111111]" /> {audio.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">
                      {audio.title}
                    </h3>

                    <p className="text-xs font-serif text-[#444444] leading-relaxed mb-4">
                      {audio.description}
                    </p>
                  </div>

                  {/* Simulated Audio Waveform Bar & Play Control */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#111111]/15">
                    <button
                      onClick={() => togglePlayAudio(audio)}
                      className={`w-9 h-9 flex items-center justify-center transition shrink-0 border cursor-pointer ${
                        isPlaying
                          ? 'bg-[#111111] text-amber-400 border-[#111111]'
                          : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-[#111111]'
                      }`}
                      title={isPlaying ? 'Stop' : 'Listen'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <div className="flex-1 flex items-center gap-0.5 h-6">
                      {[40, 65, 30, 85, 45, 95, 70, 35, 80, 50, 60, 90, 75, 40, 60, 30, 80, 55, 70, 45].map((h, i) => (
                        <span
                          key={i}
                          className={`flex-1 transition-all duration-300 ${
                            isPlaying ? 'bg-amber-600 animate-pulse' : 'bg-[#111111]/30'
                          }`}
                          style={{ height: isPlaying ? `${Math.max(15, (h + (i % 3) * 10) % 100)}%` : `${h * 0.5}%` }}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Noble Archival Empty State & Quotation Tribute Panel */
          <div className="bg-[#FAF8F5] border border-[#D5CAB7] p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#D8CEBE] pb-6 mb-6">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#855327] bg-[#EFE6D8] border border-[#D5C6B1] px-2 py-0.5 font-bold">
                    SES KAYITLARI & SÖZLÜ TARİH KÜTÜĞÜ
                  </span>
                  <span className="text-[10px] font-mono text-[#8C8273]">Doğrulanmış Arşiv</span>
                </div>
                <h4 className="font-serif-display text-xl font-bold text-[#1E1B18]">
                  Bu Şahsiyete Ait Doğrulanmış Ses Kaydı Bekleniyor
                </h4>
                <p className="text-xs font-serif text-[#5E574E] leading-relaxed">
                  Remembered platformu, şahsiyetin saygınlığı ve tarihsel gerçeklik gereği yalnızca orijinal ve doğrulanmış fonograf/bant kayıtlarını sergiler. Ailesi, vakfı veya kütük koruyucusu olarak orijinal ses kaydı veya anı kaydı ekleyebilirsiniz.
                </p>
              </div>

              <button
                onClick={() => setShowVoiceRecordModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2B2724] hover:bg-[#433C35] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider font-bold transition shadow-xs cursor-pointer shrink-0"
              >
                <Mic className="w-4 h-4 text-amber-400" />
                <span>İlk Sesli Anıyı Kaydet</span>
              </button>
            </div>

            {/* Dedication Quote Tribute Card */}
            <div className="p-4 bg-[#F2EDE2] border-l-3 border-[#8C6D3B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#8C6D3B] font-bold block">
                  EDEBİ İTHAF & YAŞAM FELSEFESİ
                </span>
                <blockquote className="font-serif italic text-xs sm:text-sm text-[#302B25] leading-relaxed">
                  &ldquo;{memorial.lifeQuote || 'Söz uçar, sadâ ebediyete intikal eder.'}&rdquo;
                </blockquote>
              </div>
              <span className="text-[11px] font-mono text-[#787163] shrink-0 font-medium self-end sm:self-center">
                — {memorial.fullName}
              </span>
            </div>
          </div>
        )}

        {/* Video Stories Section */}
        {memorial.videos && memorial.videos.length > 0 ? (
          <div className="pt-6 border-t border-[#111111]/20">
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-4 h-4 text-[#111111]" />
              <h3 className="font-serif-display text-xl font-bold text-[#111111]">
                Moving Images & Archival Film Footage
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {memorial.videos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="group cursor-pointer bg-white border border-[#111111]/20 hover:border-[#111111] p-3 transition shadow-xs"
                >
                  <div className="relative aspect-video w-full bg-[#EAEAE6] overflow-hidden border border-[#111111]/15">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover archival-bw group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="w-10 h-10 bg-white text-black flex items-center justify-center border border-black shadow-md">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </span>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black text-[10px] font-mono text-white">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="pt-2 px-1">
                    <h4 className="font-serif text-sm font-bold text-[#111111] mb-0.5">
                      {vid.title}
                    </h4>
                    {vid.description && (
                      <p className="text-xs font-serif text-[#555555] line-clamp-2">
                        {vid.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-6 border-t border-[#111111]/20">
            <div className="p-4 bg-[#F8F6F2] border border-[#DED6C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#EBE4D5] border border-[#D5C7B2] flex items-center justify-center text-[#6E6352] shrink-0">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-serif text-sm font-bold text-[#1E1B18]">
                    Tarihsel Belgesel & Hareketli Görüntü Arşivi
                  </h5>
                  <p className="text-[11px] font-serif text-[#665E52]">
                    Şu an incelenen kütük için doğrulanmış video kaydı bulunmamaktadır. Aile koleksiyonundan video ekleyebilirsiniz.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVoiceRecordModal(true)}
                className="px-3 py-1.5 bg-[#FFFFFF] border border-[#2B2724] text-[#2B2724] hover:bg-[#2B2724] hover:text-white text-[11px] font-mono uppercase font-bold transition shrink-0 cursor-pointer"
              >
                + Medya / Belge İlet
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Record Voice Note Modal */}
      {showVoiceRecordModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#111111] max-w-md w-full p-6 sm:p-8 border-2 border-[#111111] shadow-2xl">
            <div className="border-b border-[#111111] pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase text-[#777777]">ORAL ARCHIVE INTAKE</span>
              <h3 className="font-serif-display text-2xl font-bold text-[#111111]">
                Record a Spoken Memory
              </h3>
            </div>
            
            <p className="text-xs font-serif text-[#444444] mb-4 leading-relaxed">
              Record a personal memory, story, or reflection in honor of {memorial.fullName} to permanently archive for future generations.
            </p>

            <div className="p-5 bg-[#FAF8F5] border border-[#111111]/20 flex flex-col items-center justify-center mb-5 text-center">
              {!isRecording && !recordedAudioUrl && (
                <div>
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-14 h-14 bg-black hover:bg-[#333333] text-white flex items-center justify-center mx-auto mb-2 transition border border-black cursor-pointer"
                  >
                    <Mic className="w-6 h-6" />
                  </button>
                  <p className="text-xs font-mono font-bold text-[#111111]">Click to Begin Recording</p>
                  <span className="text-[10px] font-mono text-[#777777]">Browser microphone access required</span>
                </div>
              )}

              {isRecording && (
                <div>
                  <div className="flex items-center justify-center gap-2 text-black mb-3">
                    <span className="w-3 h-3 rounded-full bg-black animate-ping"></span>
                    <span className="text-base font-mono font-bold tracking-wider">
                      {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="px-4 py-2 bg-black text-white text-xs font-mono uppercase flex items-center gap-2 mx-auto transition hover:bg-[#333333] cursor-pointer"
                  >
                    <Square className="w-3 h-3 fill-current" />
                    <span>Complete Recording</span>
                  </button>
                </div>
              )}

              {recordedAudioUrl && (
                <div className="w-full">
                  <div className="flex items-center justify-center gap-1.5 text-black text-xs font-mono mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Recording Captured ({recordingSeconds}s)</span>
                  </div>
                  <audio src={recordedAudioUrl} controls className="w-full h-8 mb-2" />
                  <button
                    type="button"
                    onClick={() => { setRecordedAudioUrl(null); setRecordingSeconds(0); }}
                    className="text-[11px] font-mono text-black underline cursor-pointer"
                  >
                    Record Again
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveVoiceMemory} className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">Recording Title*</label>
                <input
                  type="text"
                  required
                  value={voiceTitle}
                  onChange={(e) => setVoiceTitle(e.target.value)}
                  placeholder="e.g., 1995 Summer Conversation or A Grandchild's Reflection"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">Era / Year (Optional)</label>
                <input
                  type="text"
                  value={voiceYear}
                  onChange={(e) => setVoiceYear(e.target.value)}
                  placeholder="2024"
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={voiceDesc}
                  onChange={(e) => setVoiceDesc(e.target.value)}
                  placeholder="Context and details of this audio story..."
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#111111]/15">
                <button
                  type="button"
                  onClick={() => setShowVoiceRecordModal(false)}
                  className="px-4 py-2 text-xs font-mono text-[#555555] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-mono uppercase bg-[#111111] text-white hover:bg-[#333333] transition cursor-pointer"
                >
                  Save to Archive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-none max-w-3xl w-full p-6 border-2 border-[#111111] text-[#111111]">
            <div className="flex items-center justify-between mb-3 border-b border-[#111111] pb-2">
              <h3 className="font-serif text-lg font-bold text-[#111111]">{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-black font-mono hover:bg-black hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full bg-[#EAEAE6] overflow-hidden flex items-center justify-center mb-3 relative border border-[#111111]/20">
              <img src={activeVideo.thumbnail} alt={activeVideo.title} className="w-full h-full object-cover archival-bw" />
              <div className="absolute text-center text-white bg-black/40 p-4 border border-white">
                <Play className="w-8 h-8 mx-auto mb-1 text-white" />
                <p className="text-xs font-mono uppercase">Playing Archival Footage</p>
              </div>
            </div>

            {activeVideo.description && (
              <p className="text-xs font-serif text-[#444444] leading-relaxed">
                {activeVideo.description}
              </p>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

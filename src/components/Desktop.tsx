import React, { useState } from 'react';
import WindowComponent from './Window';
import { AppWindow } from '../types';

export default function Desktop() {
    const [windows, setWindows] = useState<AppWindow[]>([]);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [horrorMode, setHorrorMode] = useState(false);

    const openWindow = (title: string, content: React.ReactNode) => {
        const id = Math.random().toString(36).substring(7);
        const x = 15 + (windows.length * 15 % 80);
        const y = 25 + (windows.length * 15 % 150);
        
        setWindows([...windows, {
            id,
            title,
            content,
            x,
            y,
            zIndex: nextZIndex
        }]);
        setNextZIndex(nextZIndex + 1);
    };

    const closeWindow = (id: string) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    const focusWindow = (id: string) => {
        setWindows(windows.map(w => {
            if (w.id === id) {
                return { ...w, zIndex: nextZIndex };
            }
            return w;
        }));
        setNextZIndex(nextZIndex + 1);
    };

    const triggerHorror = () => {
        setHorrorMode(true);
        setTimeout(() => {
            setHorrorMode(false);
            openWindow("SYS_ALERT", <div className="text-red-500 font-bold blink w-full pt-1 pb-2">ОШИБКА 0x889A:<br/>ПЕРИМЕТР НАРУШЕН</div>);
        }, 3400);
    };

    if (horrorMode) {
        return (
            <div className="absolute inset-0 z-[200] bg-[#440000] text-[#ff0000] flex flex-col items-center justify-center text-center p-12 crt intense-noise relative">
                <div className="text-4xl sm:text-5xl font-bold mb-8 blink text-glow-red">ОШИБКА ДОСТУПА</div>
                <div className="text-xl sm:text-2xl tracking-tighter mb-4 text-glow-red">В ДОСТУПЕ ОТКАЗАНО.</div>
                <div className="text-xl sm:text-2xl tracking-tighter text-glow-red">ОНО УЖЕ ЗДЕСЬ.</div>
                <div className="mt-auto text-[8px] opacity-50 text-glow-red">СИСТЕМА БУДЕТ ПЕРЕЗАГРУЖЕНА...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full p-0 flex flex-col overflow-hidden text-[#33ff33]">
            
            <div className="h-6 border-b border-[#33ff3344] flex justify-between items-center px-3 text-[#33ff33] text-glow text-[10px] uppercase tracking-widest z-10">
                <span>ГАЛАКТИКА СССР // ТЕРМИНАЛ v4.0.1</span>
                <span>[ 24:00:00 ]</span>
            </div>

            <div className="p-6 grid grid-cols-3 gap-6 relative z-10 w-full">
               <DesktopIcon 
                   icon={
                    <div className="w-10 h-10 border border-[#33ff33] flex items-center justify-center">
                        <div className="w-6 h-4 border border-[#33ff33]"></div>
                    </div>
                   }
                   label="Архив_Объектов.dir"
                   onClick={() => openWindow("Архив_Объектов.dir", 
                     <div className="italic text-gray-500 mt-1 text-base">
                        {"< Директория пуста. Все объекты изъяты до востребования. >"}
                     </div>
                   )}
               />
               <DesktopIcon 
                   icon={
                    <div className="w-10 h-10 border border-[#33ff33] flex items-center justify-center text-xl text-[#33ff33] text-glow">?</div>
                   }
                   label="Журнал_Наблюдений.txt"
                   onClick={() => openWindow("Журнал_Наблюдений.txt", 
                     <div className="space-y-4 pt-1 text-[11px] leading-relaxed uppercase">
                        <p className="border-b border-gray-700 pb-2">ОТЧЕТ №44-Ц // СЕКТОР 09</p>
                        <p>ОБЪЕКТ 7-Б ПРОЯВИЛ АКТИВНОСТЬ. [ДАННЫЕ УДАЛЕНЫ] ГРУППА ЗАЧИСТКИ НЕ ВЕРНУЛАСЬ НА БАЗУ. ПОСЛЕДНЯЯ ПЕРЕДАЧА СОДЕРЖАЛА ТРЕВОЖНЫЕ ЗВУКИ.</p>
                        <p className="underline opacity-70 mb-3">«ОНО СЛУШАЕТ ЧЕРЕЗ СТЕНЫ»</p>
                        <p className="mt-4">ВНИМАНИЕ: ЛЮБОЕ НЕСАНКЦИОНИРОВАННОЕ КОПИРОВАНИЕ ПРИВЕДЕТ К НЕМЕДЛЕННОЙ ЛИКВИДАЦИИ.</p>
                        <div className="mt-6 w-full h-px bg-[#33ff3344]"></div>
                        <p className="mt-4 italic">СТАТУС: КРИТИЧЕСКИЙ</p>
                     </div>
                   )}
               />
               <DesktopIcon 
                   icon={
                    <div className="w-10 h-10 border border-[#33ff33] flex items-center justify-center group">
                        <div className="w-4 h-4 bg-[#33ff33] group-hover:bg-[#ff0000]"></div>
                    </div>
                   }
                   label="СИСТ_БЕЗОПАСНОСТИ.exe"
                   onClick={triggerHorror}
               />
            </div>

            {windows.map(w => (
                <WindowComponent 
                    key={w.id} 
                    window={w} 
                    onClose={closeWindow} 
                    onFocus={focusWindow} 
                />
            ))}
            
            <div className="absolute bottom-4 left-0 right-0 px-6 z-10">
                <div className="h-px bg-[#33ff3344] w-full mb-2"></div>
                <div className="flex justify-between items-end text-[#33ff33] text-glow">
                    <div className="text-[8px] opacity-60 uppercase">
                        Владелец: Оперуполномоченный И.В. Кузнецов<br/>
                        Уровень доступа: 4 [СЕКРЕТНО]
                    </div>
                    <div className="w-16 h-16 border border-[#33ff33] flex items-center justify-center text-[8px] p-1 text-center">
                        ПЕЧАТЬ ГАЛАКТИКИ
                    </div>
                </div>
            </div>
        </div>
    );
}

function DesktopIcon({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <div 
            className={`flex flex-col items-center gap-2 cursor-pointer p-2 transition-all group hover:bg-[rgba(51,255,51,0.15)]`}
            onClick={onClick}
        >
            <div className={`transition-all`}>
                {icon}
            </div>
            <span className={`text-[9px] text-[#33ff33] text-glow text-center w-full select-none font-bold tracking-tight`}>
                {label}
            </span>
        </div>
    );
}

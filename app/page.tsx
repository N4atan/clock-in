"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, CircleCheckBig, ClockAlert, ClockArrowLeftIcon, ClockArrowRightIcon, ForkKnifeCrossed } from "lucide-react";
import { useEffect, useRef, useState } from "react";


import { format, addDays, subDays, getMonth, getDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, getYear, getDaysInMonth, lastDayOfMonth, isBefore, isToday, isAfter, isSameDay } from 'date-fns'


export default function Home() {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [today, setIsToday] = useState<Date>();
  const [idViewMonth, setViewMonth] = useState<number>();
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);

  const todayCardRef = useRef<HTMLButtonElement>(null);

  const [daySelected, setDaySelected] = useState<Date | null>(null);

  useEffect(() => {
    const getToday = () => {
      const date = new Date();
      setIsToday(date);
      setViewMonth(getMonth(date));
      setDaysInMonth(refreshDaysInMoth(getYear(date), getMonth(date)));
      setDaySelected(date);
    }
    getToday();
  }, []);
  
  useEffect(() => {
    if (today && idViewMonth !== undefined) {
      setDaysInMonth(refreshDaysInMoth(getYear(today), idViewMonth));
    }
    if (todayCardRef.current) {
      todayCardRef.current.scrollIntoView({
        behavior: "smooth", // Rola de forma suave
        block: "nearest",   // Evita rolar a página inteira para cima/baixo
        inline: "center",   // Centraliza o botão de hoje na tela horizontalmente
      });
    }
  }, [ today, idViewMonth ])



  const refreshDaysInMoth = (year: number, month: number) => {
    

    return eachDayOfInterval({
      start: startOfMonth(new Date(year, month)),
      end: endOfMonth(new Date(year, month))
    })
  }

  const handlePrevMonth = () => {
    setViewMonth(idViewMonth! - 1);
    setDaysInMonth(refreshDaysInMoth(getYear(today!), idViewMonth! - 1));
  }

  const handleNextMonth = () => {
    setViewMonth(idViewMonth! + 1);
    setDaysInMonth(refreshDaysInMoth(getYear(today!), idViewMonth! + 1));

  }

  

  return (
    <main className="flex flex-col flex-1 p-4 gap-5">
      <div className="w-full bg-base-200 border border-base-300 p-2 rounded-lg ">
        <div className="join w-full">
          <div className="join-item border-0">
            <button className="btn bg-white text-black btn-sm"><ChevronLeft size={16} strokeWidth={1}
              onClick={handlePrevMonth}

            /></button>

          </div>
          <div className="join-item w-full flex justify-center items-center border-0 opacity-80 ">{months[idViewMonth!]}</div>
          <div className="join-item border-0">
            <button className="btn bg-white text-black btn-sm"><ChevronRight size={16} strokeWidth={1} onClick={handleNextMonth} /></button>
          </div>
        </div>
      </div>



      <div className="w-full flex flex-row gap-2 items-center overflow-x-scroll py-2 pb-4">

        {daysInMonth.map((d) => (
          <button key={d.toISOString()} ref={isToday(d) ? todayCardRef : null} role="radio"
            onClick={() => setDaySelected(d)}
            className={`btn flex flex-col h-16 w-14 shrink-0 btn-sm 
              ${isToday(d) ? '' : 'btn-ghost' }
              ${daySelected && isSameDay(daySelected, d) && 'btn-primary'}
              `}
            disabled={isAfter(d, today!)}
          >
            <div className="font-light ">{format(d, "EEE")}</div>
            <div className="font-bold ">{format(d, "d")}</div>
          </button>
        ))}

      </div>

      
      <div className="w-full border border-base-300 rounded-lg flex flex-row ">
        <div className="stat">
          <div className="font-thin text-sm opacity-60">Clock in Time</div>
          <div className="opacity-80">08:00am</div>
        </div>

        <div className="stat">
          <div className="font-thin text-sm opacity-60">Break Time</div>
          <div className="opacity-80">12:00pm</div>
        </div>

        <div className="stat">
          <div className="font-thin text-sm opacity-60">Clock out Time</div>
          <div className="opacity-80">17:30pm</div>
        </div>
      </div>

      <div className="divider my-2">
        {daySelected && isToday(daySelected) ? "Today Schedules" : `${format(daySelected!, "MMMM d")}'s Schedules`}

      </div>

      <ul className="list bg-base-100 rounded-box gap-4 flex-1">
        <li className="list-row border border-base-300">
          <div className=" text-4xl flex items-center justify-center text-base">
            <ClockArrowLeftIcon size={24} strokeWidth={2} />
          </div>
          <div className="list-col-grow">
            <div>Clock out</div>
            <div className="text-xs uppercase font-semibold opacity-60">Clockout hour</div>
          </div>
          <div className="badge badge-soft badge-error badge-sm self-center">
            <ClockAlert size={14} strokeWidth={2} />
            Early
          </div>
        </li>

        <li className="list-row border border-base-300">
          <div className=" text-4xl flex items-center justify-center text-secondary">
            <ForkKnifeCrossed size={24} strokeWidth={2} />
          </div>
          <div className="list-col-grow">
            <div>Breaktime</div>
            <div className="text-xs uppercase font-semibold opacity-60">Breaktime initial time - Breaktime final time</div>
          </div>
          <div className="badge badge-soft badge-success badge-sm self-center">
            <CircleCheckBig size={14} strokeWidth={2} />
            Ok
          </div>
        </li>

        <li className="list-row border border-base-300">
          <div className=" text-4xl flex items-center justify-center text-base">
            <ClockArrowRightIcon size={24} strokeWidth={2} />
          </div>
          <div className="list-col-grow">
            <div>Clock in</div>
            <div className="text-xs uppercase font-semibold opacity-60">Clockin hour</div>
          </div>
          <div className="badge badge-soft badge-warning badge-sm self-center">
            <ClockAlert size={14} strokeWidth={2} />
            Late
          </div>
        </li>



      </ul>

      {daySelected && isToday(daySelected) && (
        <button className="btn btn-neutral sticky bottom-0  w-full">Clock In</button>
      )}
       
    </main>
  );
}

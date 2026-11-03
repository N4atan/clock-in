"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, CircleCheckBig, ClockAlert, ClockArrowLeftIcon, ClockArrowRightIcon, ForkKnifeCrossed } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";


import { format, addDays, subDays, getMonth, getDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, getYear, getDaysInMonth, lastDayOfMonth, isBefore, isToday, isAfter, isSameDay, subMonths, addMonths, startOfDay, compareDesc } from 'date-fns'
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { date } from "drizzle-orm/cockroach-core";
import { useDataContext } from "@/providers/DataProvider";
import { ptBR } from "date-fns/locale";
import { ListSchedules } from "@/components/ListSchedules";


export default function Home() {

  const { timeEntries, clockInRegister, clockOutRegister, breaktimeStartRegister, breaktimeEndRegister } = useDataContext();

  const router = useRouter();

  const [today, setToday] = useState<Date>();
  const [viewDate, setViewDate] = useState<Date>();

  const [daySelected, setDaySelected] = useState<Date>();

  const cardDayRef = useRef<HTMLButtonElement>(null);
  const scrollDaysRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToday(new Date());
    setViewDate(new Date());
    setDaySelected(new Date());
  }, [])

  useEffect(() => {

    if (cardDayRef.current) {
      cardDayRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    } else if (scrollDaysRef.current) {
      scrollDaysRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    }

  }, [viewDate])


  const days = useMemo(() => {
    if (!viewDate) return []

    return eachDayOfInterval({
      start: startOfMonth(viewDate),
      end: endOfMonth(viewDate)
    })

  }, [viewDate])

  const daySchedules = useMemo(() => {
    if (!timeEntries || !daySelected) return;

    return timeEntries.filter((t) => isSameDay(t.timestamp, daySelected)).toSorted((a, b) => compareDesc(a.timestamp, b.timestamp));

  }, [timeEntries, daySelected])

  const handlePrevMonth = () => {
    if (viewDate) {
      setViewDate(subMonths(viewDate, 1))
    }
  }

  const handleNextMonth = () => {
    if (viewDate) {
      setViewDate(addMonths(viewDate, 1))
    }
  }

  if (!viewDate || !today) {
    return <p>Carregando</p>
  }


  return (
    <main className="flex flex-col flex-1 p-4 gap-5">
      <div className="w-full bg-base-200 border border-base-300 p-2 rounded-lg ">
        <div className="join w-full">
          <div className="join-item border-0">
            <button className="btn btn-ghost btn-sm" onClick={handlePrevMonth} ><ChevronLeft size={16} strokeWidth={1} /></button>

          </div>
          <div
            className={`join-item w-full flex justify-center items-center border-0 opacity-80 
              ${isSameMonth(viewDate, today) && 'text-primary font-bold'}  
            `}
          >
            {viewDate && format(viewDate, "MMMM '-' yyyy")}
          </div>
          <div className="join-item border-0">
            <button className="btn btn-ghost btn-sm" onClick={handleNextMonth} ><ChevronRight size={16} strokeWidth={1} /></button>
          </div>
        </div>
      </div>



      <div className="w-full flex flex-row gap-2 items-center overflow-x-scroll py-2 pb-4" ref={scrollDaysRef}>

        {days.map(d => (
          <button key={d.toISOString()} role="radio"
            className={`btn flex flex-col h-16 w-14 shrink-0 btn-sm 
              ${!isToday(d) && 'btn-ghost'}
              ${isSameDay(daySelected!, d) && 'btn-primary'}
              `}
            disabled={isAfter(startOfDay(d), startOfDay(today))}
            onClick={() => setDaySelected(d)}
            ref={isSameDay(daySelected!, d) ? cardDayRef : null}
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
        {isToday(daySelected!) ? "Today Schedules" : `${format(daySelected!, "MMMM d")}'s Schedules`}


      </div>

      <ListSchedules data={daySchedules!} />

      {isSameDay(daySelected!, today) && daySchedules?.length! < 4 &&
        <div className="fixed bottom-0 left-0 right-0 bg-base-100 p-4 h-18 border-t border-base-300 ">

          {!daySchedules?.at(0) && (
            <button className="btn btn-primary" onClick={clockInRegister}>
              Clock In
            </button>
          )}

          {daySchedules?.at(0)?.type == 'CLOCK_IN' && (
            <button className="btn btn-soft btn-secondary w-full" onClick={breaktimeStartRegister}>
              Breaktime Start
            </button>
          )}

          {daySchedules?.at(0)?.type == 'BREAK_IN' && (
            <button className="btn btn-secondary w-full" onClick={breaktimeEndRegister}>
              Breaktime End
            </button>
          )}

          {daySchedules?.at(0)?.type == 'BREAK_OUT' && (
            <button className="btn btn-success w-full" onClick={clockOutRegister}>
              Clock Out
            </button>
          )}
        </div>
      }


    </main>
  );
}

import { ArrowLeft, ChevronLeft, ChevronRight, CircleCheckBig, ClockAlert, ClockArrowLeftIcon, ClockArrowRightIcon, ForkKnifeCrossed } from "lucide-react";


export default function Home() {
  return (
    <main className="flex flex-col flex-1 p-4 gap-5">
      <div className="w-full bg-base-200 border border-base-300 p-2 rounded-lg ">
        <div className="join w-full">
          <div className="join-item border-0">
            <button className="btn bg-white text-black btn-sm"><ChevronLeft size={16} strokeWidth={1} /></button>

          </div>
          <div className="join-item w-full flex justify-center items-center border-0 opacity-80 ">Month</div>
          <div className="join-item border-0">
            <button className="btn bg-white text-black btn-sm"><ChevronRight size={16} strokeWidth={1} /></button>
          </div>
        </div>
      </div>

      

      <div className="w-full grid grid-cols-[40px_repeat(7,1fr)_40px] gap-2 items-center">
        <button className="btn bg-white text-black btn-sm"><ChevronLeft size={12} strokeWidth={1} /></button>

        <button className="btn flex flex-col h-16 btn-sm">
          <div className="font-light ">Mon</div>
          <div className="font-bold ">19</div>
        </button>

        <button className="btn flex flex-col h-16 btn-sm btn-secondary">
          <div className="font-light ">Tue</div>
          <div className="font-bold ">20</div>
        </button>

        <button className="btn flex flex-col h-16 btn-sm btn-ghost">
          <div className="font-light ">Wed</div>
          <div className="font-bold ">21</div>
        </button>
        
        <button className="btn flex flex-col h-16 btn-sm btn-ghost">
          <div className="font-light ">Thu</div>
          <div className="font-bold ">22</div>
        </button>
        
        <button className="btn flex flex-col h-16 btn-sm btn-ghost">
          <div className="font-light ">Fri</div>
          <div className="font-bold ">23</div>
        </button>
        
        <button className="btn flex flex-col h-16 btn-sm btn-ghost">
          <div className="font-light ">Sat</div>
          <div className="font-bold ">24</div>
        </button>
        
        <button className="btn flex flex-col h-16 btn-sm btn-ghost">
          <div className="font-light ">Sun</div>
          <div className="font-bold ">25</div>
        </button>

        <button className="btn bg-white te xt-black btn-sm"><ChevronRight size={12} strokeWidth={1} /></button>
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

      <div className="divider my-2">Today Schedules</div>

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

      <button className="btn btn-primary sticky bottom-0 btn-wide">Clock In</button>

    </main>
  );
}

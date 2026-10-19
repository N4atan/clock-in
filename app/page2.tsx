import { ChevronRight, CircleCheckBig, ClockAlert } from "lucide-react";


export default function Home() {
  return (
    <main className="flex flex-col flex-1 p-2">
      <div className="h-64 w-full bg-base-200 mb-4 rounded-lg border border-base-300 grid grid-cols-2">
        <div className="col-span-1 flex flex-col justify-center items-left px-8">
          <h1>Title</h1>
        </div>
        
        <div></div>
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

      <ul className="list bg-base-100 rounded-box gap-4">

        <li className="p-4 pb-0  opacity-60 tracking-wide">
          <div className="flex flex-row items-center justify-between">
            <div>Histories</div>
            <button className="btn btn-sm  capitalize">
              See all
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </li>

        <li className="list-row border border-base-300">
          <div className="text-4xl font-thin opacity-60 tabular-nums text-primary">
            02
          </div>
          <div className="list-col-grow">
            <div>Weekday</div>
            <div className="text-xs uppercase font-semibold opacity-60">Clockin hour - Clockout hour</div>
          </div>
          <div className="badge badge-soft badge-success badge-sm self-center">
            <CircleCheckBig size={14} strokeWidth={2} />
            Early
          </div>
        </li>

        <li className="list-row border border-base-300">
          <div className="text-4xl font-thin opacity-30 tabular-nums">
            01
          </div>
          <div className="list-col-grow">
            <div>Weekday</div>
            <div className="text-xs uppercase font-semibold opacity-60">Clockin hour - Clockout hour</div>
          </div>
          <div className="badge badge-soft badge-warning badge-sm self-center">
            <ClockAlert size={14} strokeWidth={2} />
            Late
          </div>
        </li>

        

      </ul>
    </main>
  );
}

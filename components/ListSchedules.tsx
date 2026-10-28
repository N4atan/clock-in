import { TimeEntries } from "@/actions/timeEntriesAction";
import { format } from "date-fns";
import { ClockArrowLeftIcon, ClockAlert, ForkKnifeCrossed, CircleCheckBig, ClockArrowRightIcon, Utensils, UtensilsCrossed } from "lucide-react";

type Props = {
    data: TimeEntries[]
}

const badgeEarly = (
    <div className="badge badge-soft badge-error badge-sm self-center">
        <ClockAlert size={14} strokeWidth={2} />
        Early
    </div>
)

const badgeLater = (
    <div className="badge badge-soft badge-warning badge-sm self-center">
        <ClockAlert size={14} strokeWidth={2} />
        Late
    </div>
)

const badgeOk = (
    <div className="badge badge-soft badge-success badge-sm self-center">
        <CircleCheckBig size={14} strokeWidth={2} />
        Ok
    </div>
)

export function ListSchedules({ data }: Props) {

    return (
        <ul className="list bg-base-100 rounded-box gap-4 flex-1">

            {data.map((item) => (
                <li key={item.id} className="list-row border border-base-300">
                    <div className=" text-4xl flex items-center justify-center text-base">
                        {item.type == 'CLOCK_IN' && <ClockArrowRightIcon size={24} strokeWidth={2} />}
                        {item.type == 'CLOCK_OUT' && <ClockArrowLeftIcon size={24} strokeWidth={2} />}
                        {item.type == 'BREAK_IN' && <Utensils size={24} strokeWidth={2} className="text-secondary" />}
                        {item.type == 'BREAK_OUT' && <UtensilsCrossed size={24} strokeWidth={2} className="text-secondary" />}
                    </div>

                    <div className="list-col-grow">
                        {item.type == 'CLOCK_IN' && 
                        <>
                        <div>Clock In</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{format(item.timestamp, 'HH:mm')}</div>
                        </>
                        }
                        
                        {item.type == 'CLOCK_OUT' && 
                        <>
                        <div>Clock out</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{format(item.timestamp, 'HH:mm')}</div>
                        </>
                        }
                        
                        {item.type == 'BREAK_IN' && 
                        <>
                        <div>BreakTime - Start</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{format(item.timestamp, 'HH:mm')}</div>
                        </>
                        }

                        {item.type == 'BREAK_OUT' && 
                        <>
                        <div>BreakTime - End</div>
                        <div className="text-xs uppercase font-semibold opacity-60">{format(item.timestamp, 'HH:mm')}</div>
                        </>
                        }
                    </div>
                </li>
            ))}


        </ul>
    )
}
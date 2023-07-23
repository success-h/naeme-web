import { useEffect, useState } from "react";
import moment from "moment";

interface Props {
  className?: string;
  date: string;
}
export const Countdown = ({ date, className }: Props) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = moment(date);
  const now = moment();
  const timeBetween = targetDate.diff(now);

  useEffect(() => {
    const interval = setInterval(() => {
      const duration = moment.duration(timeBetween);
      duration.asSeconds() < 0
        ? setCountdown({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          })
        : setCountdown({
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
          });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className={`flex self-end font-bold ${className}`}>
      <div className="mx-1">{countdown.days} days</div>
      <div className="mx-2">
        {countdown.hours}:{countdown.hours > 1 ? " hrs" : "hrs"}
      </div>
      <div className="mx-1">
        {countdown.minutes}:{countdown.hours > 1 ? " mins" : "min"}
      </div>
      <div className="mx-1">{countdown.seconds}s</div>
    </div>
  );
};

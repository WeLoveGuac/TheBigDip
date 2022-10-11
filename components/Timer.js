import React from "react";

export default function CountDown({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
    const [paused, setPaused] = React.useState(false);
    const [over, setOver] = React.useState(false);
    const [time, setTime] = React.useState({
        days: parseInt(days),
        hours: parseInt(hours),
        minutes: parseInt(minutes),
        seconds: parseInt(seconds)
    });

    const tick = () => {
        if (paused || over) return;
        if (time.days == 0 && time.hours == 0 && time.minutes == 0 && time.seconds == 0)
            setOver(true);
        else if (time.hours == 0 && time.minutes == 0 && time.seconds == 0)
            setTime({
                days: time.days - 1,
                hours: 23,
                minutes: 59,
                seconds: 59
            });
        else if (time.minutes == 0 && time.seconds == 0)
            setTime({
                days: time.days,
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
            });
        else if (time.seconds == 0)
            setTime({
                days: time.days,
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
            });
        else
            setTime({
                days: time.days,
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
            });
    };

    React.useEffect(() => {
        let timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return (
        <div style={{
            position: 'absolute',
            right: '30px',
            fontFamily: "BreviaBold",
            lineHeight: '1.5',
            fontWeight: '400',
            color: '#fff9ad',
            fontSize: '20px',
            textAlign: 'center',
            marginBottom: '20px'
        }}>
            <p>{`${time.days
                .toString()
                .padStart(1, "0")} days : ${time.hours
                    .toString()
                    .padStart(2, "0")} hours : ${time.minutes
                        .toString()
                        .padStart(2, "0")} mins : ${time.seconds.toString().padStart(2, "0")} secs`}</p>
        </div>
    );
}
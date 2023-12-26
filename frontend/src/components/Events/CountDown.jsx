import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import "./style.css";
const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [second, setSecond] = useState("");
  const [time, setTime] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    //   if (
    //     typeof timeLeft.days === "undefined" &&
    //     typeof timeLeft.hours === "undefined" &&
    //     typeof timeLeft.minutes === "undefined" &&
    //     typeof timeLeft.seconds === "undefined"
    //   ) {
    //     axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    //   }
    //   return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Ngày: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Giờ: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Phút: Math.floor((difference / 1000 / 60) % 60),
        Giây: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const difference = +new Date(data.Finish_Date) - +new Date();
    setDay(Math.floor(difference / (1000 * 60 * 60 * 24)));
    setHour(Math.floor((difference / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((difference / 1000 / 60) % 60));
    setSecond(Math.floor((difference / 1000) % 60));
  }, [timeLeft]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        // timerComponents
        <div id="countdown">
          <div id="tiles">
            <span className="text-[25px] text-[#475ad2]">{day}</span>
            <li className="bg-white">:</li>
            <span className="text-[25px] text-[#475ad2]">{hour}</span>
            <li className="bg-white">:</li>
            <span className="text-[25px] text-[#475ad2]">{minutes}</span>
            <li className="bg-white">:</li>
            <span className="text-[25px] text-[#475ad2]">{second}</span>
          </div>
          <div id="labels">
            <li>Ngày</li>
            <li>Giờ</li>
            <li>Phút</li>
            <li>Giây</li>
          </div>
        </div>
      ) : (
        
        <span className="text-[red] text-[25px]"> Sự kiện đã kết thúc </span>
      )}
    </div>
  );
};

export default CountDown;

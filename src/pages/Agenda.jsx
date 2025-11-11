import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import { getAgenda } from "../services/apiAgenda";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getWeekDates = (today) => {
  // const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

  // Calculate days to subtract to get to Monday
  // If today is Sunday (0), subtract 6 days; otherwise subtract (dayOfWeek - 1)
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Get Monday of this week
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToMonday);

  // Generate array of 7 dates starting from Monday
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(date);
  }

  return weekDates;
};

function Agenda() {
  const [agendas, setAgendas] = useState([]);

  useEffect(function () {
    getAgenda().then((data) => setAgendas(data));
  }, []);

  console.log(agendas);

  const default_today = new Date();

  const weekDates = getWeekDates(default_today);

  return (
    <>
      <Heading as="h1">Agenda</Heading>
      {weekDates.map((date, index) => (
        <p key={index}>
          {" "}
          {daysOfWeek[index]} : {date.toLocaleDateString()}
        </p>
      ))}
      {agendas.map((agenda, index) => (
        <p key={index}>
          {agenda.date} at {agenda.startTime} {agenda.event}
        </p>
      ))}
    </>
  );
}

export default Agenda;

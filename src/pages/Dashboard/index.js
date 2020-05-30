import React, {useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd } from 'react-icons/md';
import { format, subDays, addDays, setHours, setMinutes, setSeconds, isBefore,
          parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz'

import { Container, Time } from './styles';

import range from '~/services/ranger';

import api from '~/services/api';
import { toast } from 'react-toastify';

function Dashboard() {

  const [date, setDate] = useState(new Date());
  const [shcedule, setShcedule] = useState([]);

  const dateFormated = useMemo(
    () => format(date, "d 'de' MMMM", {locale: pt}),
    [date]
  )

  useEffect(() => {
    async function loadSchedule(){
      const response = await api.get('/schedules', {
        params: {date}
      });
      
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
      const schedulesList = response.data.map(item => ({
        ...item,
         dataFormated: parseISO(item.date),
         timezonedate: utcToZonedTime(item.date, timezone).toGMTString()
      }));

      const data = range.map( hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour),0 ), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          compareDate: compareDate.toGMTString(),
          checkDate: checkDate.toGMTString(),
          timezone,
          past: isBefore(compareDate, new Date()),
          appointment: schedulesList.find(a => 
            a.timezonedate === compareDate.toGMTString()
          )
        }
      })
      setShcedule(data);
    }

    loadSchedule();
  }, [date])

  function handlePrevDay(){
    setDate(subDays(date, 1));
  }

  function handleNextDay(){
    setDate(addDays(date, 1));
  }

  function handleOpenScheduling(time){
    if (time.past || time.appointment)
    {
      toast.warning('Operação não permitida.')
      return;
    }
    console.log(time);
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF"/>
        </button>
        <strong>{dateFormated}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF"/>
        </button>
      </header>

      <ul>
        {shcedule.map(time => (
          <Time key={time.time} past={time.past} avaliable={!time.appointment}>
            <div>
              <strong >{time.time}</strong>
              <span>{time.appointment ? time.appointment.user.name : 'Livre'}</span>
            </div>
            {/* {!time.past && !time.appointment && (
              <button type="button" onClick={() => handleOpenScheduling(time)}>
                <MdAdd size={20}/>
                Adicionar
              </button>
            )} */}
          </Time>
        ))}
      </ul>
    </Container>
  );
}

export default Dashboard;
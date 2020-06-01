import React, {useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdPhoto, MdEventBusy } from 'react-icons/md';
import { format, subDays, addDays, setHours, setMinutes, setSeconds, isBefore,
          parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz'
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import { SemipolarLoading } from 'react-loadingg';

import { Container, Time, Options } from './styles';
import range from '../../services/ranger';
import api from '../../services/api';

function Dashboard() {

  const [date, setDate] = useState(new Date());
  const [shcedule, setShcedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const dateFormated = useMemo(
    () => format(date, "d 'de' MMMM", {locale: pt}),
    [date]
  )

  useEffect(() => {
    async function loadSchedule(){
      setLoading(true);
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
      setLoading(false);
    }

    loadSchedule();
  }, [date])

  function handlePrevDay(){
    setDate(subDays(date, 1));
  }

  function handleNextDay(){
    setDate(addDays(date, 1));
  }

  function handleSetImage(src, title){
    setIsOpen(true);
    setImage({src, title});
  }

  async function handleCancel(id){
    const deleteAppointment = await api.delete(`/appointments/${id}`);
    if (deleteAppointment.data){
      toast.info('Agendamento cancelado com sucesso!');
      window.location.reload(false);
    }else{
      toast.error('Erro ao tentar cancelar o agendamento, tente novamente mais tarde!');
    }
  }

  return (
    <Container>
      {isOpen && (
          <Lightbox
            mainSrc={image.src}
            onCloseRequest={() => setIsOpen(false)}
            imageTitle={image.title}
            imageCaption={image.title}
          />
      )}

      {loading ? (
        <div id="carregando">
          <SemipolarLoading style={{ position: 'relative', alignSelf: 'center',}}/>
          Carregando
        </div>
      ) : (
        <>
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
                {time.appointment && (
                  <Options>
                    {time.appointment.tattoo && (
                      <button type="button" onClick={() => handleSetImage(time.appointment.tattoo.url, time.appointment.user.name)}>
                        <MdPhoto size={30} color="#FFF"/>
                      </button>
                    )}

                    {!time.past && (
                      <button type="button">
                        <MdEventBusy size={30} color="#FF6347" onClick={() => handleCancel(time.appointment.id)}/>
                      </button>
                    )}
                  </Options>
                  )}
              </Time>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}

export default Dashboard;
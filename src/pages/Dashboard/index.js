import React, { useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdPhoto, MdEventBusy } from 'react-icons/md';
import { format, subDays, addDays, setHours, setMinutes, setSeconds, isBefore} from 'date-fns';

import pt from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';

import { Container, Time, Options } from './styles';
import range from '../../services/ranger';
import api from '../../services/api';

function Dashboard() {

  const [date, setDate] = useState(new Date());
  const [shcedule, setShcedule] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  const dateFormated = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  )

  useEffect(() => {
    async function loadSchedule() {

      // const parsedDate = parseISO('2020-06-12 23:00:00');

      // const znDate = zonedTimeToUtc(date, 'America/Sao_Paulo');

      // console.log(znDate);

      const response = await api.get('/schedules', {
        params: { date: format(date, 'yyyy-MM-dd') }
      });

      const schedulesList = response.data.map(item => ({
        ...item
      }));

      const data = range.map(hour => {
        const compareDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          date: format(compareDate, 'yyyy-MM-dd'),
          hour: `${hour}:00`,
          appointment: schedulesList.find(a =>
            a.date === format(date, 'yyyy-MM-dd') && a.hour === `${hour}:00`
          )
        }
      });

      setShcedule(data);
    }

    loadSchedule();
  }, [date])

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleSetImage(src, title) {
    setIsOpen(true);
    setImage({ src, title });
  }

  async function handleCancel(id) {
    const deleteAppointment = await api.delete(`/appointments/${id}`);
    if (deleteAppointment.data) {
      toast.info('Agendamento cancelado com sucesso!');
      window.location.reload(false);
    } else {
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

      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>{dateFormated}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>

      <ul>
        {shcedule.map(time => (
          <Time key={time.time} past={time.past} avaliable={!time.appointment}>
            <div className="detalhes">
              <strong >{time.time}</strong>
              <span>{time.appointment ? time.appointment.client.name : 'Livre'}</span>
              {time.appointment && (
                <span>{time.appointment.details}</span>
              )}
            </div>
            {time.appointment && (
              <Options>
                {time.appointment.tattoo && (
                  <button type="button" onClick={() => handleSetImage(time.appointment.tattoo.url, time.appointment.client.name)}>
                    <MdPhoto size={30} color="#FFF" />
                  </button>
                )}

                {!time.past && (
                  <button type="button">
                    <MdEventBusy size={30} color="#FF6347" onClick={() => handleCancel(time.appointment.id)} />
                  </button>
                )}
              </Options>
            )}
          </Time>
        ))}
      </ul>

    </Container>
  );
}

export default Dashboard;
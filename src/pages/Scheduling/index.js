import React, { useEffect, useState } from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { setHours, setMinutes, setSeconds, isBefore } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'
import { toast } from 'react-toastify';
import DayPicker from 'react-day-picker';
import { MdPhoto, MdEventBusy } from 'react-icons/md';
import Lightbox from 'react-image-lightbox';

// import history from '../../services/history';

import { Container, ContentDatePicker, Time, Options } from './styles';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../../services/datepicker';
import api from '../../services/api';
import range from '../../services/ranger';
import TattooInput from './TattooInput';

function Scheduling() {
  const [shcedule, setShcedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('/schedules', {
        params: {
          date
        }
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const schedulesList = response.data.map(item => ({
        ...item,
        timezonedate: utcToZonedTime(item.date, timezone).toGMTString()
      }));

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          date: compareDate,
          selected: false,
          appointment: schedulesList.find(a =>
            a.timezonedate === compareDate.toGMTString()
          )
        }
      });

      setShcedule(data);

    }

    loadSchedule();
  }, [date])

  function handleSetImage(src, title) {
    setIsOpen(true);
    setImage({ src, title });
  }

  function handleSelectHour(time) {
    // toast.info(time.time);
    if (time.past || time.appointment) {
      // toast.warning('Operação não permitida.')
      return;
    }

    const data = shcedule.map(item => {
      item.selected = item.time === time.time;
      return item;
    })

    setShcedule(data);
  }

  function handleDayClick(date) {
    setDate(date);
  }

  async function handleSubmit(data) {

    // inicia a validação
    const { name, detalhes } = data;
    const time = shcedule.find(item => item.selected);

    if (!time) {
      toast.error('Selecione um horário.');
      return;
    }

    if (!name) {
      toast.error('Informe o nome do.');
      return;
    }

    const requestClient = await api.post('/clients', {
      name,
      detalhes,
    });

    if (!requestClient.data.id) {
      toast.error('Erro ao tentar criar o agendamento.');
      return;
    }

    // inicia a criação
    let tattoo = null;

    const avatar = document.getElementById('avatar');
    if (avatar.files[0]) {
      const data = new FormData();
      data.append('file', avatar.files[0]);
      const response = await api.post('/files', data);
      tattoo = response.data.id;
    }

    const appointment = {
      user_id: requestClient.data.id,
      date: time.date,
      tattoo_id: tattoo,
    }
    const requestAppointment = await api.post('/appointments', appointment);

    if (requestAppointment.data) {
      toast.success('Agendamento feito com sucesso!');
    }
    window.location.reload(false);

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
      <Form onSubmit={handleSubmit} style={{ padding: 10, }}>
        <ContentDatePicker>
          <DayPicker
            locale="pt"
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            onDayClick={handleDayClick}
            selectedDays={date}
          />
        </ContentDatePicker>

        <ul>
          {shcedule.map(time =>
            <Time key={time.time} selected={time.selected} past={time.past} avaliable={!time.appointment} onClick={() => handleSelectHour(time)}>
              <div className="detalhes">
                <strong >{time.time}</strong>
                <span>{time.appointment ? time.appointment.user.name : 'Livre'}</span>
              </div>
              {time.appointment && (
                <Options>
                  {time.appointment.tattoo && (
                    <button type="button" onClick={() => handleSetImage(time.appointment.tattoo.url, time.appointment.user.name)}>
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
          )}
        </ul>

        <Input name="name" placeholder="Nome do Cliente" />

        <TattooInput name="tattoo_id" />

        <Textarea rows={5} name="detalhes" placeholder="Outras informações" />

        <button type="submit">
          Salvar agendamento
          </button>
      </Form>

    </Container>
  );
}

export default Scheduling;
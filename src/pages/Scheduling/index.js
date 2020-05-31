import React, {useEffect, useState} from 'react';
import {Form, Input} from '@rocketseat/unform';
import { setHours, setMinutes, setSeconds, isBefore, formatRelative } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'
import { toast } from 'react-toastify';
import DayPicker  from 'react-day-picker';
import { MdPhoto, MdEventBusy } from 'react-icons/md';
import Lightbox from 'react-image-lightbox';
import { SemipolarLoading } from 'react-loadingg';

import { Container, ContentDatePicker, Time, Options } from './styles';
import { MONTHS , WEEKDAYS_LONG, WEEKDAYS_SHORT } from '../../services/datepicker';
import api from '../../services/api';
import range from '../../services/ranger';
import TattooInput from './TattooInput';

function Scheduling() {
  const [shcedule, setShcedule] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function loadSchedule(){
      setLoading(true);
      const response = await api.get('/schedules', {
        params: {date}
      });
      
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
      const schedulesList = response.data.map(item => ({
        ...item,
        timezonedate: utcToZonedTime(item.date, timezone).toGMTString()
      }));

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour),0 ), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          date,
          selected: false,
          appointment: schedulesList.find(a => 
            a.timezonedate === compareDate.toGMTString()
          )
        }
      });

      setShcedule(data);

      setLoading(false);
    }

    loadSchedule();
  }, [date])

  function handleSetImage(src, title){
    setIsOpen(true);
    setImage({src, title});
  }

  function handleSelectHour(time){
    // toast.info(time.time);
    if (time.past || time.appointment)
    {
      // toast.warning('Operação não permitida.')
      return;
    }
    
    const data = shcedule.map(item => {
      item.selected = item.time === time.time;
      return item;
    })
    
    setShcedule(data);
  }

  function handleDayClick(date){
    setDate(date);
  }

  async function handleSubmit(data){
    const { name } = data;

    const requestClient = await api.post('/clients', {
      name,
    });

    if (!requestClient.data.id)
    {
      toast.error('Erro ao tentar criar o agendamento.');
      return;
    }

    const cliente = requestClient.data;

    const requestAppointment = await api.post('/appointments', cliente);

    if (requestAppointment.data){
      toast.success('Agendamento feito com sucesso!');
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
      <Form onSubmit={handleSubmit}>
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

        {loading ?  (
          <div id="carregando">
            <SemipolarLoading style={{ position: 'relative', alignSelf: 'center',}}/>
            Carregando
          </div>
        ) : (
          <>
            <ul>
              {shcedule.map(time =>
                <Time key={time.time} selected={time.selected} past={time.past} avaliable={!time.appointment} onClick={() => handleSelectHour(time)}>
                  <div className="detalhes">
                    <strong >{time.time}</strong>
                    <span>{time.appointment ? time.appointment.user.name : 'Livre'}</span>
                  </div>
                  {time.appointment && (
                  <Options>
                    <button type="button" onClick={() => handleSetImage(time.appointment.tattoo.url, time.appointment.user.name)}>
                      <MdPhoto size={30} color="#FFF"/>
                    </button>
                    <button type="button">
                      <MdEventBusy size={30} color="#FFF"/>
                    </button>
                  </Options>
                  )}
                </Time>
              )}
            </ul>
            
            <Input name="name" placeholder="Nome Completo" />
            
            <TattooInput name="tattoo_id"/>

            <button type="submit">Salvar agendamento</button>
          </>
        )}
      </Form>
       
    </Container>
  );
}

export default Scheduling;
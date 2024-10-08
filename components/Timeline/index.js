import React from 'react';
import { Chrono } from 'react-chrono';

const Timeline = ({ appointments }) => {
    const items = appointments.map(appointment => {
        const formattedTime = new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const formattedDate = new Date(appointment.date).toLocaleDateString(); 
        return {
            title: formattedDate,
            cardTitle: appointment.description,
            cardSubtitle: `${formattedDate} at ${formattedTime}`, 
            cardDetailedText: appointment.long_description
        };
    });

    return (
        <div style={{ width: "auto", maxWidth: "100%", height: "auto", overflow: "hidden", zIndex: "2000" }}>
            <Chrono 
                items={items} 
                mode="HORIZONTAL" 
            />
        </div>
    );
};

export default Timeline;

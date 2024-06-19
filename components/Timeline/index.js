// components/Timeline.js
import React from 'react';
import { Chrono } from 'react-chrono';

const Timeline = ({ appointments }) => {
    const items = appointments.map(appointment => ({
        title: new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cardTitle: appointment.description,
        cardSubtitle: new Date(appointment.time).toLocaleDateString(),
    }));

    return (
        <div style={{width:"auto", maxWidth:"100%", height: "auto", overflow:"hidden",zIndex:"2000" }}>
            <Chrono items={items} mode="HORIZONTAL" />
        </div>
    );
};

export default Timeline;

import React from 'react'
import { Container } from 'react-bootstrap'
import { DeviceSettings } from '../DeviceInfo'
import { convertToTimeStr } from '../util'
import DataBlock from './DataBlock'
import style from './scss/deviceDetails.module.scss'

const SettingsDisplay = ({
  red,
  green,
  blue,
  ledOnTime,
  ledOffTime,
  fanDuration,
  fanInterval,
  floodFreq,
  floodDuration,
}: DeviceSettings) => {
  return (
    <>
      <Container fluid className={style.dataBox}>
        <DataBlock title="Red LED" data={red} unit="%" />
        <DataBlock title="Green LED" data={green} unit="%" />
        <DataBlock title="Blue LED" data={blue} unit="%" />
        <DataBlock title="LED on" data={convertToTimeStr(ledOnTime)} />
        <DataBlock title="LED off" data={convertToTimeStr(ledOffTime)} />
      </Container>
      <Container fluid className={style.dataBox}>
        <DataBlock title="Flood Frequency" data={floodFreq} unit=" times" />
        <DataBlock title="Flood duration" data={floodDuration} unit=" min" />
        <DataBlock title="Fan interval" data={fanInterval} unit=" min" />
        <DataBlock title="Fan duration" data={fanDuration} unit=" min" />
      </Container>
    </>
  )
}
export default SettingsDisplay

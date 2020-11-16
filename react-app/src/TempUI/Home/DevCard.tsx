import React from 'react'
import { Card, CardProps, Col, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import infoIcon from '../img/info.svg'
import humIcon from '../img/water.svg'
import tempIcon from '../img/thermometer.svg'
import style from './scss/devCard.module.scss'
import { CircleIcon } from '../../common/components/SvgIcons'
import devicePic from '../img/lettuce.png'
import { DeviceInfo } from '../DeviceInfo'
import { getStatus } from '../util'

type DevCardProps = { deviceInfo: DeviceInfo; currRoute: string } & CardProps
const DevCard = ({ deviceInfo, currRoute, ...rest }: DevCardProps) => {
  const { name, id, data } = deviceInfo
  const { temp, hum, valveClose, pumpOn, lastUpdatedSince, isOnline } = data
  const onlineIndicatorClass = () =>
    `${style.onlineIndicator} ${isOnline ? style.online : style.offline}`
  return (
    <Link to={`${currRoute}/plant/${id}`} className={style.devCardLink}>
      <Card className={style.devCard}>
        <Card.Img height="150px" variant="top" src={devicePic} />
        <Card.Body>
          <Card.Title className={style.cardName}>{name}</Card.Title>
          <Card.Text>
            <Row className={style.lastUpdated}>
              <Col className={style.lastUpdatedText}>
                Last updated {lastUpdatedSince}
              </Col>
              <Col xs={1} className={style.onlineIndicator}>
                <CircleIcon className={onlineIndicatorClass()} />
              </Col>
            </Row>
            <Row>
              <Col xs={1}>
                <Image src={tempIcon} className={style.icon} />
              </Col>
              <Col> {temp}°F</Col>
              <Col xs={1}>
                <Image src={humIcon} className={style.icon} />
              </Col>
              <Col> {hum}%</Col>
            </Row>
            <Row className="mt-2">
              <Col xs={1}>
                <Image src={infoIcon} className={style.icon} />
              </Col>
              <Col>{getStatus(valveClose, pumpOn)}</Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default DevCard
from time import sleep
from aws_iot_client import IoTClient
from threading import Event, Thread
from data import Data
from settings import Settings
from time import sleep
from behaviour import Behaviour
import json

def run_task_interval(interval=1):
    def decorator(function):
        def wrapper(*args, **kwargs):
            result = None
            while 1:
                result = function(*args, **kwargs)
                sleep(interval)
            return result

        return wrapper

    return decorator

class Hydroponics:
    def __init__(self, iot_config, peri_config, iot_disabled=False):
        self.behaviour = Behaviour(peri_config)
        self.iot_disabled = iot_disabled
        if not iot_disabled:
            topic_prefix = "iothydroponics/device/{}".format(iot_config.client_id)
            settings_topic = "{}/settings".format(topic_prefix)
            device_update_topic = "{}/update".format(topic_prefix)
            self.iot_config = iot_config
            self.client = IoTClient(
                settings_topic=settings_topic,
                device_update_topic=device_update_topic,
                **self.iot_config.__dict__
            )
            self.publish_thread = Thread(target=self.publish_at_interval)

    @property
    def current_settings(self):
        return self.behaviour.settings
    
    @property
    def current_data(self):
        self.behaviour.update_temp_hum()
        return self.behaviour.data

    @run_task_interval(0.5)
    def publish_at_interval(self):
        self.publish()

    @run_task_interval(0.5)
    def timed_events(self):
        self.behaviour.update_all()
        
    @run_task_interval(0.4)
    def overflow_prevention(self):
        print('test')
        self.behaviour.water_level_flood_control()

    def publish(self):
        self.client.publish_update(self.current_data, self.current_settings)

    # Callback when the subscribed topic receives a message

    def on_message_received(self, topic, payload, **kwargs):
        new_settings = json.loads(payload)
        print("New settings: {}\n".format(new_settings))
        self.behaviour.update_settings(new_settings)
        self.publish()  # republish immediately

    def start(self):
        self.overflow_monitor_thread = Thread(target=self.overflow_prevention)
        if not self.iot_disabled:
            self.client.subscribe_topic(self.on_message_received)
            self.iot_client_run_thread = Thread(target=self.client.run)
        self.edge_behaviour = Thread(target=self.timed_events)
        
        if not self.iot_disabled:
            self.iot_client_run_thread.start()
            self.publish_thread.start()

        self.edge_behaviour.start()
        self.overflow_monitor_thread.start()

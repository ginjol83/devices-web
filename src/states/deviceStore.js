import { defineStore } from 'pinia';
import axios from 'axios';

export const useDeviceStore = defineStore('deviceStore', {
  state: () => ({
    devices: [],
    currentPage: 1,
    limit: 10,
    totalElements: 0,
  }),
  actions: {
    async fetchDevices(page) {
        console.log(page)
      try {
        const response = await axios.get(`https://localhost:3000/devices?limit=10&page=${page}`);
        this.devices = response.data._data.devices;
        this.currentPage = parseInt(response.data._page.page);
        this.limit = parseInt(response.data._page.limit);
        this.totalElements = response.data._page.totalElements;
        
      } catch (error) {
        console.error('Error al obtener los dispositivos:', error);
      }
    },
    async deleteDevice(uuid) {
        
      if (confirm(`¿Estás seguro de querer eliminar el dispositivo con UUID: ${uuid}?`)) {
        try {
          await axios.delete(`https://localhost:3000/device/${uuid}`);
          console.log(`Dispositivo con UUID: ${uuid} ha sido eliminado.`);
          console.log("vamos a refrescaaaaaar")
          this.fetchDevices(this.currentPage);
          console.log("vamos a refrescao")
        } catch (error) {
          console.error('Error al eliminar el dispositivo:', error);
        }
      } else {
        console.log('Eliminación cancelada por el usuario.');
      }
    },
  },
});

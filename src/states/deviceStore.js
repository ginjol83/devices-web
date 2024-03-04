import { defineStore } from 'pinia';
import axios from 'axios';

export const deviceStore = defineStore('deviceStore', {
  state: () => ({
    devices: [],
    currentPage: 1,
    limit: 10,
    totalElements: 0,
  }),
  actions: {
    async fetchDevices(page = 1) {
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
          this.fetchDevices(this.currentPage);
        } catch (error) {
          console.error('Error al eliminar el dispositivo:', error);
        }
      } else {
        console.log('Eliminación cancelada por el usuario.');
      }
    },
  },
});

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
    async addDevices(formData,page) {
      try {
        await axios.post('https://localhost:3000/device', formData);
        const response = await axios.get(`https://localhost:3000/devices?limit=10&page=${page}`);
        this.devices = response.data._data.devices;
        this.currentPage = parseInt(response.data._page.page);
        this.limit = parseInt(response.data._page.limit);
        this.totalElements = response.data._page.totalElements;
      } catch (error) {
        console.error('Error al crear dispositivo:', error);
      }
    },
    async modifyDevices(uuid, formData,page) {
      try {
        await axios.put(`https://localhost:3000/device/${uuid}`, formData)
        const response = await axios.get(`https://localhost:3000/devices?limit=10&page=${page}`);
        this.devices = response.data._data.devices;
        this.currentPage = parseInt(response.data._page.page);
        this.limit = parseInt(response.data._page.limit);
        this.totalElements = response.data._page.totalElements;
      } catch (error) {
        console.error('Error al modificar los dispositivos:', error);
      }
    },
    
    async fetchDevices(page,nameFilter, typeFilter, brandFilter, modelFilter, registrationDateFilter,statusFilter) {
      const nameQuery = nameFilter?`&name=${nameFilter}`:''
      const typeQuery = typeFilter?`&type=${typeFilter}`:''
      const brandFQuery = brandFilter?`&brand=${brandFilter}`:''
      const modelFQuery = modelFilter?`&model=${modelFilter}`:''
      const registrationDateQuery = registrationDateFilter?`&registrationDate=${registrationDateFilter}`:''
      const statusQuery = statusFilter?`&status=${statusFilter}`:''
      const filterParams = statusQuery+nameQuery+typeQuery+brandFQuery+modelFQuery+registrationDateQuery

      try {
        const response = await axios.get(`https://localhost:3000/devices?limit=10&page=${page}${filterParams}`)
           
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

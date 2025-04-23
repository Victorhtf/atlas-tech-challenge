import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Motorista {
  _id?: string;
  nome: string;
  cpf: string;
  cnh: {
    numero: string;
    validade: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Veiculo {
  _id?: string;
  modelo: string;
  placa: string;
  tipo: string;
  capacidade: number;
  createdAt: string;
}

export interface Viagem {
  motorista: Motorista,
  data: string;
  _id?: string;
  origem: string;
  destino: string;
  dataPartida: string;
  previsaoChegada: string;
  veiculo: Veiculo;
  status?: string;
  createdAt: string;
  updatedAt: string
}

export const motoristaService = {
  getAll: async (): Promise<Motorista[]> => {
    const response = await api.get("/motoristas");
    return response.data;
  },
  getById: async (id: string): Promise<Motorista> => {
    const response = await api.get("/motoristas", {
      params: { id },
    });
    return response.data;
  },
  create: async (data: Motorista): Promise<Motorista> => {
    const response = await api.post("/motoristas", data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/motoristas/${id}`);
  },
};

export const veiculoService = {
  getAll: async (): Promise<Veiculo[]> => {
    const response = await api.get("/veiculos");
    return response.data;
  },
  getById: async (id: string): Promise<Veiculo> => {
    const response = await api.get("/veiculos", {
      params: { id },
    });
    return response.data;
  },
  create: async (data: Veiculo): Promise<Veiculo> => {
    const response = await api.post("/veiculos", data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/veiculos/${id}`);
  },
};

export const viagemService = {
  getAll: async (): Promise<Viagem[]> => {
    const response = await api.get("/viagens");
    return response.data;
  },
  getById: async (id: string): Promise<Viagem> => {
    const response = await api.get("/viagens", {
      params: { id },
    });
    return response.data[0];
  },
  getByMotorista: async (motoristaId: string): Promise<Viagem[]> => {
    const response = await api.get("/viagens", {
      params: { motorista: motoristaId },
    });
    return response.data;
  },
  getByVeiculo: async (veiculoId: string): Promise<Viagem[]> => {
    const response = await api.get("/viagens", {
      params: { veiculo: veiculoId },
    });
    return response.data;
  },
  create: async (data: Viagem): Promise<Viagem> => {
    const response = await api.post("/viagens", data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/viagens/${id}`);
  },
};

export default api;

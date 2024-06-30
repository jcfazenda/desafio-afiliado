export interface ConfigurationType {
    id: string;
    id_enviroment: string;
    country_iso: string;
    brand: string;
    operation_type: string;
    name: string;
    version: string;
    description: string;
    enabled: string;
  
    environment: Environment;
    enum_brand: enum_brand;
    enum_operation_type: enum_operation_type;
    enum_country: enum_country;
    avatar: string;
  }
  
  export interface enum_brand {
    id?: number;
    name?: string;
  }
  
  export interface Environment {
    id: number;
    name: string;
  }
  
  export interface enum_operation_type {
    id: number;
    name: string;
  }
  
  export interface enum_country {
    id: number;
    name: string;
  }
  
  export class Configuration implements ConfigurationType {
    id: string;
    id_enviroment: string;
    country_iso: string;
    brand: string;
    operation_type: string;
    name: string;
    version: string;
    description: string;
    enabled: string;
  
    environment: Environment;
    enum_brand: enum_brand;
    enum_operation_type: enum_operation_type;
    enum_country: enum_country;
    avatar: string;
  
    constructor(data?: Partial<ConfigurationType>) {
      if (data) {
        Object.assign(this, data); // Atribui as propriedades do objeto data à instância da classe
      }
    }
  }
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  get client() {
    return this.supabase;
  }

  // Mesa operations
  async getMesas() {
    const { data, error } = await this.supabase
      .from('mesa')
      .select('*')
      .is('deleted', null)
      .order('numero');
    
    return { success: !error, data, error };
  }

  async updateMesaEstado(numero: string, estado: number) {
    const { data, error } = await this.supabase
      .from('mesa')
      .update({ estado })
      .eq('numero', numero)
      .is('deleted', null);
    
    return { success: !error, data, error };
  }

  // Producto operations
  async getProductos() {
    const { data, error } = await this.supabase
      .from('producto')
      .select(`
        *,
        categoria:idcategoria(nombre)
      `)
      .is('deleted', null)
      .order('nombre');
    
    return { success: !error, data, error };
  }

  async searchProductos(searchTerm: string) {
    const { data, error } = await this.supabase
      .from('producto')
      .select(`
        *,
        categoria:idcategoria(nombre)
      `)
      .ilike('nombre', `%${searchTerm}%`)
      .is('deleted', null)
      .order('nombre');
    
    return { success: !error, data, error };
  }

  // Pedido operations
  async getPedidosHoy() {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await this.supabase
      .from('pedido')
      .select(`
        *,
        pedidodetalle:pedidodetalle(
          *,
          producto:idproducto(nombre, categoria:idcategoria(nombre))
        )
      `)
      .eq('fecha', today)
      .eq('estado', 1)
      .eq('deleted', 0)
      .order('created_at', { ascending: false });
    
    return { success: !error, data, error };
  }

  async insertPedido(pedidoData: any) {
    const { data, error } = await this.supabase
      .from('pedido')
      .insert(pedidoData)
      .select()
      .single();
    
    return { success: !error, data, error };
  }

  async insertPedidoDetalle(detalleData: any) {
    const { data, error } = await this.supabase
      .from('pedidodetalle')
      .insert(detalleData)
      .select();
    
    return { success: !error, data, error };
  }

  async updatePedido(idpedido: number, updateData: any) {
    const { data, error } = await this.supabase
      .from('pedido')
      .update(updateData)
      .eq('idpedido', idpedido);
    
    return { success: !error, data, error };
  }

  async deletePedido(idpedido: number, motivo: string, responsable: string) {
    const { data, error } = await this.supabase
      .from('pedido')
      .update({ 
        estado: 0, 
        deleted: 1, 
        motivo, 
        responsable,
        updated_at: new Date().toISOString()
      })
      .eq('idpedido', idpedido);
    
    return { success: !error, data, error };
  }

  // Toppings operations
  async getToppings() {
    const { data, error } = await this.supabase
      .from('toppings')
      .select('*')
      .is('deleted', null)
      .order('nombre');
    
    return { success: !error, data, error };
  }

  // Apertura caja operations
  async getAperturaHoy() {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await this.supabase
      .from('apertura_caja')
      .select('*')
      .eq('fecha', today)
      .is('deleted', null)
      .maybeSingle();
    
    return { success: !error, data: data ? [data] : [], error };
  }

  async insertAperturaCaja(aperturaData: any) {
    const { data, error } = await this.supabase
      .from('apertura_caja')
      .insert(aperturaData)
      .select();
    
    return { success: !error, data, error };
  }

  async cerrarCaja(fecha: string) {
    const { data, error } = await this.supabase
      .from('apertura_caja')
      .update({ estado: 2 })
      .eq('fecha', fecha)
      .is('deleted', null);
    
    return { success: !error, data, error };
  }

  // Gastos operations
  async getGastos(fecha: string) {
    const { data, error } = await this.supabase
      .from('gastos')
      .select(`
        *,
        categoriagastos:idcategoriagastos(descripcion)
      `)
      .eq('fecha', fecha)
      .eq('deleted', 0)
      .order('created_at', { ascending: false });
    
    return { success: !error, data, error };
  }

  async insertGasto(gastoData: any) {
    const { data, error } = await this.supabase
      .from('gastos')
      .insert(gastoData)
      .select();
    
    return { success: !error, data, error };
  }

  async getCategoriasGastos() {
    const { data, error } = await this.supabase
      .from('categoriagastos')
      .select('*')
      .is('deleted', null)
      .order('descripcion');
    
    return { success: !error, data, error };
  }

  // Reports
  async getReporteDiario(fecha: string) {
    const { data, error } = await this.supabase
      .from('pedido')
      .select('yape, plin, visa, efectivo, fecha')
      .eq('estado', 3)
      .eq('fecha', fecha);
    
    if (error) return { success: false, data: null, error };
    
    // Calculate totals
    const totals = data.reduce((acc, curr) => ({
      yape: acc.yape + (curr.yape || 0),
      plin: acc.plin + (curr.plin || 0),
      visa: acc.visa + (curr.visa || 0),
      efectivo: acc.efectivo + (curr.efectivo || 0),
      fecha: curr.fecha
    }), { yape: 0, plin: 0, visa: 0, efectivo: 0, fecha });
    
    return { success: true, data: [totals], error: null };
  }

  async getReporteRango(fechaInicio: string, fechaFin: string) {
    const { data, error } = await this.supabase
      .from('pedido')
      .select('yape, plin, visa, efectivo, fecha')
      .eq('estado', 3)
      .gte('fecha', fechaInicio)
      .lte('fecha', fechaFin);
    
    if (error) return { success: false, data: null, error };
    
    // Group by date and calculate totals
    const groupedData = data.reduce((acc: any, curr: any) => {
      const fecha = curr.fecha;
      if (!acc[fecha]) {
        acc[fecha] = { yape: 0, plin: 0, visa: 0, efectivo: 0, fecha };
      }
      acc[fecha].yape += curr.yape || 0;
      acc[fecha].plin += curr.plin || 0;
      acc[fecha].visa += curr.visa || 0;
      acc[fecha].efectivo += curr.efectivo || 0;
      return acc;
    }, {});
    
    return { success: true, data: Object.values(groupedData), error: null };
  }
}
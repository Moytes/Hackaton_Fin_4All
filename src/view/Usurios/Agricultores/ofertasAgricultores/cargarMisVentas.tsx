import React, { useEffect, useState } from 'react';
import { Button, Card, Tag, message, Spin, Empty, Badge, Timeline } from 'antd';
import { 
  ArrowLeftOutlined, 
  ShoppingOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TruckOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../services/view/landing/auth/login/api';
import './crearOferta';

interface Compra {
  id: number;
  cantidad_cultivo: number;
  precio_total: number;
  fecha_compra: string;
  estado: string;
  aprobacion_distribuidor: boolean;
  aprobacion_logistica: boolean;
  aprobacion_productor: boolean;
  usuario: {
    username: string;
  };
  oferta_cultivo: {
    id: number;
    cantidad_disponible: number;
    precio_tonelada: number;
    entidad_federativa: string;
  };
  oferta_logistica?: {
    origen: string;
    destino: string;
    costo_total: number;
  };
}

const MisVentas: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarMisVentas();
  }, []);

  const cargarMisVentas = async () => {
    try {
      setLoading(true);
      const response = await api.get('/compra/productor/mis-ventas');
      setCompras(response.data);
    } catch (error: any) {
      console.error('Error cargando ventas:', error);
      message.error('Error al cargar las ventas');
    } finally {
      setLoading(false);
    }
  };

  const aprobarPago = async (compraId: number) => {
    try {
      await api.put(`/compra/${compraId}/aprobar`, {
        tipo_aprobacion: 'pago_productor'
      });
      message.success('Pago confirmado exitosamente');
      cargarMisVentas(); // Recargar datos
    } catch (error: any) {
      console.error('Error aprobando pago:', error);
      message.error('Error al confirmar el pago');
    }
  };

  const getEstadoCompra = (compra: Compra) => {
    if (compra.aprobacion_productor) {
      return { text: 'Completada', color: 'green' };
    }
    if (compra.aprobacion_logistica && compra.oferta_logistica) {
      return { text: 'Pendiente tu pago', color: 'orange' };
    }
    if (compra.aprobacion_distribuidor) {
      return { text: 'En proceso', color: 'blue' };
    }
    return { text: 'Pendiente', color: 'default' };
  };

  const getTimelineItems = (compra: Compra) => {
    const items = [
      {
        color: compra.estado !== 'pendiente' ? 'green' : 'gray',
        children: 'Compra realizada',
        dot: compra.estado !== 'pendiente' ? <CheckCircleOutlined /> : <ClockCircleOutlined />
      },
      {
        color: compra.aprobacion_distribuidor ? 'green' : 'gray',
        children: 'Entrega confirmada por distribuidor',
        dot: compra.aprobacion_distribuidor ? <CheckCircleOutlined /> : <ClockCircleOutlined />
      }
    ];

    if (compra.oferta_logistica) {
      items.push({
        color: compra.aprobacion_logistica ? 'green' : 'gray',
        children: 'Pago a logística confirmado',
        dot: compra.aprobacion_logistica ? <CheckCircleOutlined /> : <ClockCircleOutlined />
      });
    }

    items.push({
      color: compra.aprobacion_productor ? 'green' : 'gray',
      children: 'Pago confirmado por ti',
      dot: compra.aprobacion_productor ? <CheckCircleOutlined /> : <ClockCircleOutlined />
    });

    return items;
  };

  const comprasPendientesAprobacion = compras.filter(compra => 
    compra.aprobacion_distribuidor && 
    (!compra.oferta_logistica || compra.aprobacion_logistica) && 
    !compra.aprobacion_productor
  );

  const comprasCompletadas = compras.filter(compra => compra.aprobacion_productor);
  const comprasEnProceso = compras.filter(compra => 
    !compra.aprobacion_productor && 
    !comprasPendientesAprobacion.includes(compra)
  );

  if (loading) {
    return (
      <div className="ventas-container">
        <div className="ventas-loading">
          <Spin size="large" />
          <p>Cargando tus ventas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ventas-container">
      <div className="ventas-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
      </div>

      <div className="ventas-content">
        <div className="ventas-card">
          <div className="logo-container">
            <div className="logo">
              <span className="logo-icon">💰</span>
              <span className="logo-text">Mis Ventas</span>
            </div>
          </div>

          <h1 className="main-title">Historial de Ventas</h1>
          <p className="subtitle">
            Gestiona y realiza seguimiento a las compras de tus productos
          </p>

          <div className="button-group">
            <Button
              className="back-button"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/agricultor')}
            >
              Volver al Panel
            </Button>
            
            <div className="stats-container">
              <Badge count={comprasPendientesAprobacion.length} showZero={false}>
                <Tag color="orange" icon={<ClockCircleOutlined />}>
                  Pendientes de Pago
                </Tag>
              </Badge>
              <Badge count={comprasCompletadas.length} showZero={false}>
                <Tag color="green" icon={<CheckCircleOutlined />}>
                  Completadas
                </Tag>
              </Badge>
              <Tag color="blue" icon={<ShoppingOutlined />}>
                Total: {compras.length} ventas
              </Tag>
            </div>
          </div>

          {/* Sección: Pendientes de Aprobación */}
          {comprasPendientesAprobacion.length > 0 && (
            <section className="ventas-section">
              <h2 className="section-title">
                <DollarOutlined /> Pendientes de Confirmar Pago
              </h2>
              <div className="compras-grid">
                {comprasPendientesAprobacion.map((compra) => (
                  <Card key={compra.id} className="compra-card highlight-card" hoverable>
                    <div className="compra-header">
                      <div className="compra-info">
                        <h3>Compra #{compra.id}</h3>
                        <Tag color="orange">Confirmar Pago</Tag>
                      </div>
                      <span className="compra-distribuidor">
                        👤 {compra.usuario.username}
                      </span>
                    </div>

                    <div className="compra-details">
                      <div className="detail-row">
                        <span><strong>Cantidad:</strong> {compra.cantidad_cultivo} ton</span>
                        <span><strong>Precio Total:</strong> ${compra.precio_total.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span><strong>Ubicación:</strong> {compra.oferta_cultivo.entidad_federativa}</span>
                        <span><strong>Fecha:</strong> {dayjs(compra.fecha_compra).format('DD/MM/YYYY')}</span>
                      </div>
                    </div>

                    <Timeline items={getTimelineItems(compra)} className="compra-timeline" />

                    <div className="compra-actions">
                      <Button 
                        type="primary" 
                        icon={<CheckCircleOutlined />}
                        onClick={() => aprobarPago(compra.id)}
                        className="confirm-button"
                      >
                        Confirmar Pago Recibido
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Sección: En Proceso */}
          {comprasEnProceso.length > 0 && (
            <section className="ventas-section">
              <h2 className="section-title">
                <ClockCircleOutlined /> Ventas en Proceso
              </h2>
              <div className="compras-grid">
                {comprasEnProceso.map((compra) => (
                  <Card key={compra.id} className="compra-card" hoverable>
                    <div className="compra-header">
                      <div className="compra-info">
                        <h3>Compra #{compra.id}</h3>
                        <Tag color={getEstadoCompra(compra).color}>
                          {getEstadoCompra(compra).text}
                        </Tag>
                      </div>
                      <span className="compra-distribuidor">
                        👤 {compra.usuario.username}
                      </span>
                    </div>

                    <div className="compra-details">
                      <div className="detail-row">
                        <span><strong>Cantidad:</strong> {compra.cantidad_cultivo} ton</span>
                        <span><strong>Precio Total:</strong> ${compra.precio_total.toLocaleString()}</span>
                      </div>
                      {compra.oferta_logistica && (
                        <div className="logistica-info">
                          <TruckOutlined /> 
                          <span>Logística: {compra.oferta_logistica.origen} → {compra.oferta_logistica.destino}</span>
                        </div>
                      )}
                    </div>

                    <Timeline items={getTimelineItems(compra)} className="compra-timeline" />
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Sección: Completadas */}
          {comprasCompletadas.length > 0 && (
            <section className="ventas-section">
              <h2 className="section-title">
                <CheckCircleOutlined /> Ventas Completadas
              </h2>
              <div className="compras-grid">
                {comprasCompletadas.map((compra) => (
                  <Card key={compra.id} className="compra-card completed-card" hoverable>
                    <div className="compra-header">
                      <div className="compra-info">
                        <h3>Compra #{compra.id}</h3>
                        <Tag color="green">Completada</Tag>
                      </div>
                      <span className="compra-distribuidor">
                        👤 {compra.usuario.username}
                      </span>
                    </div>

                    <div className="compra-details">
                      <div className="detail-row">
                        <span><strong>Cantidad:</strong> {compra.cantidad_cultivo} ton</span>
                        <span><strong>Precio Total:</strong> ${compra.precio_total.toLocaleString()}</span>
                      </div>
                      <div className="detail-row">
                        <span><strong>Fecha Compra:</strong> {dayjs(compra.fecha_compra).format('DD/MM/YYYY')}</span>
                        <span><strong>Estado:</strong> {compra.estado}</span>
                      </div>
                    </div>

                    <Timeline items={getTimelineItems(compra)} className="compra-timeline" />
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Estado vacío */}
          {compras.length === 0 && (
            <div className="empty-state">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay ventas registradas"
              >
                <p>Tus ofertas aún no han recibido compras.</p>
                <Button type="primary" onClick={() => navigate('/agricultor/ofertas')}>
                  Crear Nueva Oferta
                </Button>
              </Empty>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisVentas;
// ============================================================
// TYPES
// ============================================================

export type MachineStatus = 'running' | 'stopped' | 'fault' | 'warning'
export type AlarmSeverity = 'critical' | 'warning' | 'info'
export type TagQuality = 'Good' | 'Bad' | 'Uncertain'
export type TagType = 'Double' | 'Int32' | 'String' | 'Boolean' | 'Float'

export interface Machine {
  id: string
  name: string
  status: MachineStatus
  speed_rpm: number
  temperature_c: number
  pressure_bar: number
  production_count: number
  timestamp: string
}

export interface Alarm {
  id: string
  machine_id: string
  alarm_code: string
  description: string
  severity: AlarmSeverity
  acknowledged: boolean
  created_at: string
}

export interface TrendPoint {
  timestamp: string
  value: number
}

export interface OpcTag {
  node_id: string
  name: string
  path: string
  type: TagType
  value: string | number | boolean
  quality: TagQuality
  timestamp: string
}

export interface Product {
  id: string
  name: string
  type: string
  description: string
  specs: Record<string, string>
  tags: string[]
  color: string
}

export interface Protocol {
  name: string
  supported: boolean
  note?: string
}

export interface ArchitectureNode {
  id: string
  label: string
  sublabel?: string
  layer: 'cloud' | 'edge' | 'machine' | 'field'
  description: string
  protocols: string[]
  usecase: string
  x?: number
  y?: number
}

// ============================================================
// CONSTANTS
// ============================================================

export const MACHINE_THRESHOLDS = {
  temperature_c: { warn: 75, fault: 85 },
  pressure_bar: { warn: 5.5, fault: 7.0 },
  speed_rpm: { warn: 1400, fault: 1500 },
}

export const MACHINE_CONFIGS = [
  { id: 'M01', name: 'Enchedor Principal', baseTemp: 72, baseSpeed: 1240, basePressure: 4.2 },
  { id: 'M02', name: 'Capsulador', baseTemp: 68, baseSpeed: 1220, basePressure: 3.8 },
  { id: 'M03', name: 'Rotulador', baseTemp: 65, baseSpeed: 1200, basePressure: 3.5 },
  { id: 'M04', name: 'Paletizador', baseTemp: 60, baseSpeed: 800, basePressure: 2.8 },
]

export const PROTOCOLS: Protocol[] = [
  { name: 'OPC UA', supported: true, note: 'Servidor + Cliente nativo' },
  { name: 'MQTT / Sparkplug B', supported: true, note: 'IIoT / Edge' },
  { name: 'Modbus TCP/RTU', supported: true, note: 'Nativo' },
  { name: 'Siemens S7TCP', supported: true, note: 'S7-300/400/1200/1500' },
  { name: 'CODESYS', supported: true, note: 'Nativo' },
  { name: 'EtherNet/IP (CIP)', supported: true, note: 'ControlLogix / Logix5000' },
  { name: 'Micro800 / Micro850', supported: true, note: 'Nativo' },
  { name: 'ODBC', supported: true, note: 'SQL Server, MySQL, SQLite' },
  { name: 'InfluxDB', supported: true, note: 'Time-series nativo' },
  { name: 'REST / HTTP', supported: true, note: 'Via NetLogic C#' },
  { name: 'EtherNet/IP Genérico', supported: true, note: '' },
  { name: 'BACnet', supported: false, note: 'Em roadmap' },
]

export const DEPLOY_TARGETS = [
  { id: 'windows', label: 'Windows PC', os: 'Windows 10/11, Server', icon: '🪟', note: 'Runtime + Studio' },
  { id: 'linux', label: 'Linux PC', os: 'Ubuntu 20.04+, Debian', icon: '🐧', note: 'Runtime' },
  { id: 'browser', label: 'Web Browser', os: 'Qualquer SO', icon: '🌐', note: 'HTML5 via HTTPS' },
  { id: 'panel', label: 'OptixPanel', os: 'Closed OS', icon: '🖥️', note: 'Pré-instalado' },
  { id: 'edge', label: 'OptixEdge', os: 'Linux embarcado', icon: '📡', note: 'Headless DIN Rail' },
  { id: 'logix', label: 'Logix Edge', os: 'Embedded Linux', icon: '⚙️', note: 'No controlador' },
]

export const PRODUCTS: Product[] = [
  {
    id: 'software',
    name: 'FT Optix Software',
    type: 'Software (IDE + Runtime)',
    description: 'Plataforma de desenvolvimento HMI/IIoT com IDE web + desktop, scripting C#, version control nativo e deploy multi-plataforma.',
    specs: {
      'Versão': '1.4.2',
      'IDE': 'Web (FT Hub) + Desktop',
      'Plataformas': 'Windows · Linux · Browser',
      'Licença': 'Token-based (Named / Concurrent)',
      'Scripting': 'C# via NetLogic',
      'Version Control': 'GitHub / FT Vault',
      'Multi-user': 'Sim (SaaS colaborativo)',
      'CI/CD': 'GitHub Actions nativo',
    },
    tags: ['IDE', 'SaaS', 'CI/CD', 'GitHub', 'C#', 'Multi-user'],
    color: '#00C8FF',
  },
  {
    id: 'panel',
    name: 'OptixPanel',
    type: 'Hardware HMI Selado',
    description: 'Terminais HMI industriais com Optix Runtime e Remote Access pré-instalados. Plug-and-play, IP66 frontal, OS fechado para segurança máxima.',
    specs: {
      'OS': 'Closed (segurança máxima)',
      'Built-in': 'FT Optix Runtime + Remote Access',
      'Proteção': 'IP66 frontal',
      'Tamanhos': '7" · 10" · 12" · 15"',
      'Instalação': 'Plug-and-play',
      'Config. SO': 'Zero (pré-configurado)',
      'Ambiente': 'Industrial (poeira, vibração)',
      'Certificação': 'CE · UL · cUL',
    },
    tags: ['Hardware', 'Sealed', 'IP66', 'VPN integrada', 'Plug-and-play'],
    color: '#22C55E',
  },
  {
    id: 'edge',
    name: 'OptixEdge',
    type: 'Hardware DIN Rail',
    description: 'Módulo compacto para trilho DIN com Linux embarcado. Headless, gerenciado remotamente via browser. Ideal para edge computing em máquinas sem display.',
    specs: {
      'Form Factor': 'DIN Rail 35mm',
      'OS': 'Linux embarcado',
      'Display': 'Nenhum (headless)',
      'Acesso': 'Web browser remoto',
      'Plataforma': 'Agnóstica',
      'Uso típico': 'Edge computing / IIoT',
      'Alimentação': '24VDC',
      'Certificação': 'CE · UL',
    },
    tags: ['Edge', 'DIN Rail', 'Linux', 'Headless', 'IIoT'],
    color: '#F97316',
  },
  {
    id: 'remote',
    name: 'FT Remote Access',
    type: 'Software VPN Industrial',
    description: 'Solução de VPN industrial para acesso remoto seguro. Permite diagnóstico e manutenção sem deslocamento. Incluído no OptixPanel, disponível separado para outros hardwares.',
    specs: {
      'Protocolo': 'Secure VPN Tunnel (TLS)',
      'Incluído em': 'OptixPanel (built-in)',
      'Separado': 'Instalável em PC/Linux',
      'Sem VPN própria': 'Sim (gerenciado)',
      'Casos de uso': 'Suporte · Manutenção · Diagnóstico',
      'Gestão': 'Portal centralizado',
      'Autenticação': '2FA + certificados',
      'Logs': 'Auditoria completa',
    },
    tags: ['VPN', 'Remote', 'Secure', 'Suporte', 'Manutenção'],
    color: '#a78bfa',
  },
  {
    id: 'dataready',
    name: 'DataReady',
    type: 'Aplicação Smart Machine',
    description: 'Aplicação IIoT para contextualização e transmissão de dados de máquina para sistemas MES, ERP e analytics cloud.',
    specs: {
      'Função': 'Coleta → Contextualiza → Envia',
      'KPIs': 'OEE · Disponibilidade · Qualidade',
      'Destinos': 'DataMosaix · Plex · Fiix',
      'Base': 'Construído sobre FT Optix',
      'Protocolo': 'OPC UA → MQTT → Cloud',
      'Dados': 'Real-time + histórico',
      'Configuração': 'Low-code / template',
      'Licença': 'Incluída com FT Optix',
    },
    tags: ['IIoT', 'OEE', 'MES', 'DataMosaix', 'Plex', 'Fiix'],
    color: '#f472b6',
  },
]

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  // Cloud
  {
    id: 'ft-hub',
    label: 'FactoryTalk Hub',
    sublabel: 'SaaS',
    layer: 'cloud',
    description: 'IDE web colaborativo e portal de gerenciamento de projetos Optix. Acesso via browser, sem instalação.',
    protocols: ['HTTPS', 'WebSocket', 'OPC UA'],
    usecase: 'Desenvolvimento multi-usuário, gerenciamento de licenças, deploy remoto',
  },
  {
    id: 'datamosaix',
    label: 'DataMosaix',
    sublabel: 'Analytics Cloud',
    layer: 'cloud',
    description: 'Plataforma de analytics industrial da Rockwell Automation para KPIs, OEE e análise de dados de produção.',
    protocols: ['MQTT', 'REST', 'HTTPS'],
    usecase: 'OEE em tempo real, análise de paradas, benchmarking de produção',
  },
  {
    id: 'plex',
    label: 'Plex',
    sublabel: 'MES Cloud',
    layer: 'cloud',
    description: 'Manufacturing Execution System (MES) cloud da Rockwell Automation.',
    protocols: ['REST API', 'HTTPS'],
    usecase: 'Rastreabilidade de produção, qualidade, ordens de fabricação',
  },
  {
    id: 'fiix',
    label: 'Fiix',
    sublabel: 'CMMS Cloud',
    layer: 'cloud',
    description: 'Computerized Maintenance Management System (CMMS) integrado ao ecossistema FactoryTalk.',
    protocols: ['REST API', 'HTTPS'],
    usecase: 'Ordens de manutenção, histórico de ativos, manutenção preditiva',
  },
  // Edge
  {
    id: 'optix-edge',
    label: 'OptixEdge',
    sublabel: 'DIN Rail · Linux',
    layer: 'edge',
    description: 'Hardware DIN Rail com Linux embarcado para edge computing. Headless, gerenciado via web browser.',
    protocols: ['OPC UA', 'MQTT', 'Modbus'],
    usecase: 'Edge computing em máquinas sem display, buffering de dados, pré-processamento',
  },
  {
    id: 'logix-edge',
    label: 'Logix Embedded Edge',
    sublabel: 'No controlador',
    layer: 'edge',
    description: 'Módulo de edge computing integrado diretamente nos CLPs ControlLogix.',
    protocols: ['OPC UA', 'EtherNet/IP'],
    usecase: 'Edge analytics direto no controlador, sem hardware adicional',
  },
  // Machine
  {
    id: 'optix-panel',
    label: 'OptixPanel',
    sublabel: 'HMI Selado',
    layer: 'machine',
    description: 'Terminal HMI industrial com Optix Runtime + Remote Access pré-instalados. IP66, plug-and-play.',
    protocols: ['OPC UA', 'EtherNet/IP', 'Modbus', 'MQTT'],
    usecase: 'HMI de operador em máquinas e células de manufatura',
  },
  {
    id: 'hmi-pc',
    label: 'HMI PC',
    sublabel: 'Windows · Linux',
    layer: 'machine',
    description: 'PC industrial ou workstation executando FT Optix Runtime em Windows ou Linux.',
    protocols: ['OPC UA', 'EtherNet/IP', 'Modbus', 'S7TCP', 'ODBC'],
    usecase: 'SCADA, supervisório de linha, estação de engenharia',
  },
  {
    id: 'web-client',
    label: 'Web Browser',
    sublabel: 'Qualquer SO',
    layer: 'machine',
    description: 'Interface HMI acessível via browser HTML5, sem instalação de software.',
    protocols: ['HTTPS', 'WebSocket'],
    usecase: 'Acesso de supervisores, dashboards gerenciais, acesso mobile',
  },
  // Field
  {
    id: 'controllogix',
    label: 'ControlLogix',
    sublabel: 'Allen-Bradley',
    layer: 'field',
    description: 'CLP ControlLogix da Allen-Bradley (Rockwell Automation). Comunicação nativa via EtherNet/IP (CIP).',
    protocols: ['EtherNet/IP', 'CIP', 'OPC UA'],
    usecase: 'Controle de processo, aplicações de alta disponibilidade',
  },
  {
    id: 'micro850',
    label: 'Micro850',
    sublabel: 'Allen-Bradley',
    layer: 'field',
    description: 'CLP compacto da família Micro800. Ideal para máquinas e aplicações de pequeno porte.',
    protocols: ['EtherNet/IP', 'Modbus'],
    usecase: 'Controle de máquinas, aplicações compactas, OEM',
  },
  {
    id: 's7-1500',
    label: 'Siemens S7-1500',
    sublabel: 'Siemens',
    layer: 'field',
    description: 'CLP S7-1500 da Siemens. Suportado via driver S7TCP nativo no Optix.',
    protocols: ['S7TCP', 'OPC UA', 'Profinet'],
    usecase: 'Integração brownfield com automação Siemens existente',
  },
  {
    id: 'codesys',
    label: 'CODESYS PLC',
    sublabel: 'Multi-vendor',
    layer: 'field',
    description: 'CLPs baseados em CODESYS (Wago, Beckhoff, etc). Suportados nativamente.',
    protocols: ['CODESYS', 'OPC UA', 'Modbus'],
    usecase: 'Integração com automação CODESYS multi-vendor',
  },
]

export const USE_CASES = [
  {
    title: 'OEM de Packaging',
    icon: '📦',
    sector: 'Packaging / OEM',
    challenge: 'Múltiplas máquinas com PLCs heterogêneos (Allen-Bradley + Siemens) sem visibilidade unificada',
    solution: 'Optix como camada de abstração OPC UA — um projeto, múltiplos alvos. Dashboard centralizado.',
    result: 'Dashboard único para operação + dados em tempo real para DataMosaix',
    tags: ['OPC UA', 'Multi-vendor', 'DataMosaix', 'OEE'],
  },
  {
    title: 'Manufatura Contratada',
    icon: '🏭',
    sector: 'Manufatura',
    challenge: 'Centralizar dados de linhas heterogêneas de vários clientes com rastreabilidade total',
    solution: 'OptixEdge em cada célula + FT Hub para visualização centralizada de todos os clientes',
    result: 'OEE em tempo real + rastreabilidade completa de componentes por ordem de fabricação',
    tags: ['OptixEdge', 'FT Hub', 'Rastreabilidade', 'Multi-site'],
  },
  {
    title: 'Integrador de Sistemas',
    icon: '🔧',
    sector: 'System Integration',
    challenge: 'Reuso de código entre projetos diferentes, velocidade de comissionamento, controle de versão',
    solution: 'Templates versionados no GitHub + CI/CD automático via GitHub Actions',
    result: 'Redução de 40% no tempo de comissionamento. Zero conflito de versão entre projetos.',
    tags: ['GitHub', 'CI/CD', 'Templates', 'Version Control'],
  },
  {
    title: 'Suporte & Manutenção Remota',
    icon: '🛰️',
    sector: 'Field Service',
    challenge: 'Equipe de suporte dispersa geograficamente, alto custo de deslocamento em campo',
    solution: 'OptixPanel com FT Remote Access built-in. VPN industrial para diagnóstico e ajuste remoto.',
    result: 'Diagnóstico e correção sem deslocamento. Redução de 60% em tempo de resposta a falhas.',
    tags: ['Remote Access', 'VPN', 'OptixPanel', 'Field Service'],
  },
]

export const NETLOGIC_CODE = `using System;
using UAManagedCore;
using FTOptix.NetLogic;
using FTOptix.Core;
using FTOptix.HMIProject;

/// <summary>
/// NetLogic: Monitoramento de threshold e geração de alarmes
/// Executado a cada 1 segundo via PeriodicTask
/// </summary>
public class ThresholdMonitor : BaseNetLogic
{
    [ExportMethod]
    public void CheckThresholds()
    {
        // Busca todas as máquinas no DataModel
        var machinesFolder = Project.Current
            .Get<FolderType>("DataModel/Machines");

        foreach (var machine in machinesFolder.Children)
        {
            // Leitura de tags em tempo real
            double temp = (double)machine
                .GetVariable("Temperature_C").Value;
            double speed = (double)machine
                .GetVariable("Speed_RPM").Value;

            // Threshold de temperatura
            double tempLimit = (double)machine
                .GetVariable("TempHighLimit").Value;

            if (temp > tempLimit)
            {
                TriggerAlarm(machine, "TEMP_HIGH",
                    $"Temperatura {temp:F1}°C " +
                    $"acima do limite {tempLimit:F0}°C",
                    severity: 700); // OPC UA: 0–1000
            }

            // Modificação dinâmica em runtime
            if (speed > 1450)
            {
                // Reduz setpoint automaticamente
                machine.GetVariable("SpeedSetpoint")
                    .Value = new UAValue(1200.0);

                LogNetLogic(LogLevel.Warning,
                    $"{machine.BrowseName}: " +
                    "Velocidade reduzida automaticamente");
            }
        }
    }

    private void TriggerAlarm(IUANode machine,
        string code, string message, int severity)
    {
        var alarm = InformationModel
            .Make<AlarmConditionType>(code);
        alarm.Message.Value = message;
        alarm.Severity.Value = (ushort)severity;
        machine.Get<AlarmController>("Alarms")
              .Trigger(alarm);
    }
}
`

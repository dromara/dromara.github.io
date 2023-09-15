export type ProjectsOption = {
  PROJECTS: string;
  DESCRIPTION: string;
  PROJECT_SPONSOR: string;
  JOINING_DATE: string;
  START_UP: string;

  DISTRIBUTED_TRANSACTION: string;
  HMILY_DESC: string;
  RAINCAT_DESC: string;
  MYTH_DESC: string;

  POPULAR_TOOLS: string;
  HUTOOL_DESC: string;
  FOREST_DESC: string;
  LITEFLOW_DESC: string;
  DYNAMIC_TP_DESC: string;
  EASY_ES_DESC: string;
  GO_VIEW_DESC: string;
  IMAGE_COMBINER_DESC: string;
  JINX_DESC: string;
  ELECTRON_EGG_DESC: string;
  NORTHSTAR_DESC: string;
  EASY_TRANS_DESC: string;
  FAST_REQUEST_DESC: string;
  REDISFRONT_DESC: string;
  X_EASYPDF_DESC: string;
  GOBRS_ASYNC_DESC: string;
  OPEN_GITEYE_API_DESC: string;
  BINLOG4J_DESC: string;
  SMS4J_DESC: string;
  STREAM_QUERY_DESC: string;
  PAYMENT_SPRING_BOOT_DESC: string;
  EASYTRANS_DESC: string;
  NEUTRINO_PROXY_DESC: string;
  TESTHUB_DESC: string;
  YFT_DESIGN_DESC: string;
  ZYPLAYER_DOC_DESC: string;

  ENTERPRISE_CERTIFICATION: string;
  SA_TOKEN_DESC: string;
  MAXKEY_DESC: string;
  SURENESS_DESC: string;

  OPERATIONS_AND_MAINTENANCE_CONTROL: string;
  JPOM_DESC: string;
  HERTZBEAT_DESC: string;
  CUBIC_DESC: string;
  ATHENA_DESC: string;

  DISTRIBUTED_LOG: string;
  TLOG_DESC: string;

  BIG_DATA: string;
  CLOUDEON_DESC: string;
  DATA_COMPARE_DESC: string;

  MICROSERVICE: string;
  KOALAS_RPC_DESC: string;
  MENDMIX_DESC: string;
  LAMP_CLOUD_DESC: string;
  DANTE_CLOUD_DESC: string;
  OPEN_CAPACITY_PLATFORM_DESC: string;
  RUOYI_VUE_PLUS_DESC: string;
  J2EEFAST_DESC: string;

  DISTRIBUTED_SCHEDULING: string;
  HODOR_DESC: string;
  DISJOB_DESC: string;
};

export type ProjectItem = {
  name: string;
  website: string;
  description: string;
  sponsor: string;
  date: string;
  link: string;
};

export type GroupDetail = {
  groupName: string;
  projects: ProjectItem[];
};

export type GroupOrder = {
  groupName: string;
  projects: string[];
};

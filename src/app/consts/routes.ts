export enum routes {
  DASHBOARD = '/dashboard',
  PROFILE = '/user/profile',
  CHANGE_PASSWORD = '/app/change-password',
  LOGIN = '/login',

  // --- CRUD module ---//

  Users = '/admin/users',
  Users_CREATE = '/admin/users/new',
  Users_EDIT = '/admin/users/edit',

  // --- E-commerce ---//

  MANAGEMENT = '/e-commerce/management',
  PRODUCT_EDIT = '/e-commerce/edit',
  PRODUCT_CREATE = '/e-commerce/create',
  PRODUCTS = '/e-commerce/products',
  PRODUCT = '/e-commerce/product',

  // --- Documentation ---//

  LIBS = '/documentation/libs',
  STRUCTURE = '/documentation/structure',
  OVERVIEW = '/documentation/overview',
  LICENCES = '/documentation/licences',
  QUICK_START = '/documentation/quick start',
  CHARTS = '/documentation/charts',
  FORMS = '/documentation/forms',
  UI = '/documentation/ui',
  MAPS = '/documentation/maps',
  TABLES = '/documentation/tables',

  // --- Core module ---//

  TYPOGRAPHY = '/core/typography',
  COLORS = '/core/colors',
  GRID = '/core/grid',

  // --- Tables module ---//

  TABLES_BASIC = '/tables/basic',
  TABLES_DYNAMIC = '/tables/dynamic',

  // --- Ui Elements module --- //

  ICONS = '/ui/icons',
  BADGE = '/ui/badge',
  CAROUSEL = '/ui/carousel',
  CARDS = '/ui/cards',
  MODAL = '/ui/modal',
  NOTIFICATION = '/ui/notification',
  NAVBAR = '/ui/navbar',
  TOOLTIPS = '/ui/tooltips',
  TABS = '/ui/tabs',
  PAGINATION = '/ui/pagination',
  PROGRESS = '/ui/progress',
  WIDGET = '/ui/widget',

  // --- Forms module ---//

  FORMS_ELEMENTS = '/forms/elements',
  FORMS_VALIDATION = '/forms/validation',

  // --- Charts module ---//

  BAR_CHARTS = '/charts/bar',
  LINE_CHARTS = '/charts/line',
  PIE_CHARTS = '/charts/pie',
  OVERVIEW_CHARTS = '/charts/overview',

  // --- Maps module --- //

  GOOGLE_MAP = '/maps/google',
  VECTOR_MAP = '/maps/vector',

  // --- Extra module ---//

  CALENDAR = '/extra/calendar',
  INVOICE = '/extra/invoice',
  LOGIN_PAGE = '/extra/login',
  ERROR_PAGE = '/extra/errorpage',
  GALLERY = '/extra/gallery',
  SEARCH_RESULT = '/extra/search result',
  TIME_LINE = '/extra/time line',
}

import { GraphQLClient } from "graphql-request"
import { Options } from "graphql-request/dist/src/types"
import { jsonToGraphQLQuery } from "graphql-ts-client"
import { DeepRequired } from "ts-essentials"

export type UUID = string
export type IDate = Date | string
export type Maybe<T> = null | undefined | T
export type Projection<S, B> = {
  [k in keyof S & keyof B]: S[k] extends boolean
    ? B[k]
    : B[k] extends Array<infer A>
    ? Projection<S[k], A>[]
    : Projection<S[k], B[k]>
}

export enum CouponKind {
  dynamic = "DYNAMIC",
  regular = "REGULAR"
}

export enum ReservationStatusCode {
  noShow = "NO_SHOW",
  booked = "BOOKED",
  modifiedAndCheckedIn = "MODIFIED_AND_CHECKED_IN",
  nonBlockedRequest = "NON_BLOCKED_REQUEST",
  checkedIn = "CHECKED_IN",
  checkedOut = "CHECKED_OUT",
  bookedButModified = "BOOKED_BUT_MODIFIED",
  blockedRequest = "BLOCKED_REQUEST",
  cancelled = "CANCELLED"
}

export enum UpdateAction {
  create = "CREATE",
  delete = "DELETE",
  update = "UPDATE"
}

export enum Aggregation {
  average = "AVERAGE",
  median = "MEDIAN",
  sum = "SUM"
}

export enum AmenityScope {
  home = "HOME",
  room = "ROOM",
  bathroom = "BATHROOM",
  sleepingPlaces = "SLEEPING_PLACES"
}

export enum AssetContextType {
  home = "HOME",
  customField = "CUSTOM_FIELD"
}

export enum AssetType {
  leased = "LEASED",
  managedProperty = "MANAGED_PROPERTY"
}

export enum BackOfficePrivilege {
  admin = "ADMIN",
  restrictedData = "RESTRICTED_DATA",
  modify = "MODIFY",
  read = "READ"
}

export enum BathroomKind {
  indoorOutdoorShower = "INDOOR_OUTDOOR_SHOWER",
  halfBath = "HALF_BATH",
  sharedBath = "SHARED_BATH",
  noBath = "NO_BATH",
  fullBath = "FULL_BATH"
}

export enum BlockedPeriodSource {
  workOrder = "WORK_ORDER",
  other = "OTHER",
  lateCheckOut = "LATE_CHECK_OUT",
  booking = "BOOKING",
  earlyCheckIn = "EARLY_CHECK_IN",
  buyOutBooking = "BUY_OUT_BOOKING"
}

export enum BookKind {
  manual = "MANUAL",
  rules = "RULES"
}

export enum BookingChangeRequestKind {
  checkIn = "CHECK_IN",
  checkOut = "CHECK_OUT"
}

export enum BookingChangeRequestStatus {
  ignored = "IGNORED",
  waitingForApproval = "WAITING_FOR_APPROVAL",
  rejected = "REJECTED",
  requested = "REQUESTED",
  accepted = "ACCEPTED"
}

export enum BookingIssue {
  missingAccessCode = "MISSING_ACCESS_CODE",
  missingIdVerification = "MISSING_ID_VERIFICATION",
  missingAccessInstruction = "MISSING_ACCESS_INSTRUCTION",
  idVerificationExpired = "ID_VERIFICATION_EXPIRED",
  missingContract = "MISSING_CONTRACT",
  nonZeroPaymentBalance = "NON_ZERO_PAYMENT_BALANCE"
}

export enum BookingPeriodReference {
  checkInDate = "CHECK_IN_DATE",
  checkOutDate = "CHECK_OUT_DATE",
  creationDate = "CREATION_DATE",
  period = "PERIOD"
}

export enum BookingSorting {
  checkInDate = "CHECK_IN_DATE",
  checkOutDate = "CHECK_OUT_DATE",
  creationDate = "CREATION_DATE",
  id = "ID"
}

export enum BookingStatus {
  checkedOut = "CHECKED_OUT",
  booked = "BOOKED",
  quoted = "QUOTED",
  checkedIn = "CHECKED_IN",
  noShow = "NO_SHOW",
  cancelled = "CANCELLED",
  requested = "REQUESTED",
  modified = "MODIFIED"
}

export enum BookingTier {
  standard = "STANDARD",
  vip = "VIP"
}

export enum CouponBookingPeriodType {
  any = "ANY",
  exact = "EXACT"
}

export enum CouponHomeApplicableTo {
  allProperties = "ALL_PROPERTIES",
  selectedProperties = "SELECTED_PROPERTIES"
}

export enum CouponSorting {
  availableForHighSeason = "AVAILABLE_FOR_HIGH_SEASON",
  salesPeriod = "SALES_PERIOD",
  discount = "DISCOUNT",
  creationDate = "CREATION_DATE",
  bookingPeriod = "BOOKING_PERIOD",
  code = "CODE"
}

export enum CreditCardType {
  discover = "DISCOVER",
  other = "OTHER",
  visa = "VISA",
  masterCard = "MASTER_CARD",
  americanExpress = "AMERICAN_EXPRESS"
}

export enum CustomFieldKind {
  optionsMultiple = "OPTIONS_MULTIPLE",
  money = "MONEY",
  markdown = "MARKDOWN",
  number = "NUMBER",
  duration = "DURATION",
  enum = "ENUM",
  dateTime = "DATE_TIME",
  boolean = "BOOLEAN",
  person = "PERSON",
  optionsSingle = "OPTIONS_SINGLE",
  phone = "PHONE",
  time = "TIME",
  email = "EMAIL",
  date = "DATE",
  timeRange = "TIME_RANGE",
  asset = "ASSET",
  text = "TEXT"
}

export enum CustomFieldScope {
  home = "HOME",
  booking = "BOOKING",
  region = "REGION",
  global = "GLOBAL"
}

export enum CustomFieldSectionKind {
  user = "USER",
  thirdParty = "THIRD_PARTY",
  internal = "INTERNAL"
}

export enum DiscountKind {
  absolute = "ABSOLUTE",
  fixedTotal = "FIXED_TOTAL",
  percentage = "PERCENTAGE"
}

export enum EventSourceKind {
  byPerson = "BY_PERSON",
  unknownSource = "UNKNOWN_SOURCE",
  bySlackWebHook = "BY_SLACK_WEB_HOOK",
  byReactiveBookingSync = "BY_REACTIVE_BOOKING_SYNC",
  byBookingChangeRequestNotification = "BY_BOOKING_CHANGE_REQUEST_NOTIFICATION",
  byHomeEventListener = "BY_HOME_EVENT_LISTENER",
  byWorkOrderSync = "BY_WORK_ORDER_SYNC",
  bySlackNotifier = "BY_SLACK_NOTIFIER",
  bookingIdRequestFollowUpsResend = "BOOKING_ID_REQUEST_FOLLOW_UPS_RESEND",
  byHomeSync = "BY_HOME_SYNC",
  byUser = "BY_USER"
}

export enum ExperienceKindName {
  sports = "SPORTS",
  artsAndTheater = "ARTS_AND_THEATER",
  film = "FILM",
  misc = "MISC",
  concerts = "CONCERTS",
  family = "FAMILY"
}

export enum FeeKind {
  tax = "TAX",
  required = "REQUIRED",
  optional = "OPTIONAL",
  petFee = "PET_FEE",
  securityDeposit = "SECURITY_DEPOSIT"
}

export enum Gender {
  female = "FEMALE",
  male = "MALE"
}

export enum Granularity {
  monthly = "MONTHLY",
  daily = "DAILY",
  quarterly = "QUARTERLY",
  yearly = "YEARLY",
  weekly = "WEEKLY"
}

export enum HomeConfigAuditStatus {
  ok = "OK",
  missing = "MISSING",
  notApplicable = "NOT_APPLICABLE"
}

export enum HomeDateOccupancyStatus {
  checkOut = "CHECK_OUT",
  checkIn = "CHECK_IN",
  vacant = "VACANT",
  occupied = "OCCUPIED",
  checkOutAndCheckIn = "CHECK_OUT_AND_CHECK_IN"
}

export enum HomeInspectionKind {
  other = "OTHER",
  postStay = "POST_STAY",
  preAndPostStay = "PRE_AND_POST_STAY",
  preStay = "PRE_STAY"
}

export enum HomeLiveStatus {
  undefined = "UNDEFINED",
  live = "LIVE",
  offBoarded = "OFF_BOARDED",
  leaseSigned = "LEASE_SIGNED",
  beingOnBoarded = "BEING_ON_BOARDED"
}

export enum HomeQuerySorting {
  relevance = "RELEVANCE",
  priceDesc = "PRICE_DESC",
  regionName = "REGION_NAME",
  homeName = "HOME_NAME",
  priceAsc = "PRICE_ASC"
}

export enum HomeRingDeviceStatus {
  available = "AVAILABLE",
  notAvailable = "NOT_AVAILABLE"
}

export enum HowDidYouHearAboutUs {
  other = "OTHER",
  socialMedia = "SOCIAL_MEDIA",
  familyOrFriend = "FAMILY_OR_FRIEND",
  searchEngine = "SEARCH_ENGINE",
  thirdPartyPlatform = "THIRD_PARTY_PLATFORM"
}

export enum InHouseMonitoringStatus {
  noisy = "NOISY",
  crowded = "CROWDED",
  offline = "OFFLINE"
}

export enum LeadSource {
  bookingCom = "BOOKING_COM",
  website = "WEBSITE",
  airBnb = "AIR_BNB",
  theWesley = "THE_WESLEY",
  other = "OTHER",
  expedia = "EXPEDIA",
  rentalsUnited = "RENTALS_UNITED",
  nonPayingGuest = "NON_PAYING_GUEST",
  marriott = "MARRIOTT",
  homeAway = "HOME_AWAY",
  frontdesk = "FRONTDESK"
}

export enum MaintenanceStatus {
  clean = "CLEAN",
  dirty = "DIRTY",
  occupied = "OCCUPIED",
  pendingInspection = "PENDING_INSPECTION"
}

export enum OccupancyStatus {
  vacant = "VACANT",
  occupied = "OCCUPIED",
  inactive = "INACTIVE"
}

export enum OnBoardingStage {
  signed = "SIGNED",
  closeOff = "CLOSE_OFF",
  outForSignature = "OUT_FOR_SIGNATURE",
  offBoarded = "OFF_BOARDED",
  inspection = "INSPECTION",
  leaseCreation = "LEASE_CREATION",
  completed = "COMPLETED",
  movedBackwards = "MOVED_BACKWARDS",
  remediationAndPlanning = "REMEDIATION_AND_PLANNING",
  execution = "EXECUTION"
}

export enum OnBoardingStatus {
  preOnBoarding = "PRE_ON_BOARDING",
  offBoarded = "OFF_BOARDED",
  stabilized = "STABILIZED",
  onBoarding = "ON_BOARDING",
  new = "NEW"
}

export enum PersonNotifyLogStatus {
  notSent = "NOT_SENT",
  bounced = "BOUNCED",
  spamComplaint = "SPAM_COMPLAINT",
  transient = "TRANSIENT",
  delivered = "DELIVERED",
  linkClicked = "LINK_CLICKED",
  opened = "OPENED",
  error = "ERROR"
}

export enum RateType {
  standard = "STANDARD",
  yieldStandard = "YIELD_STANDARD",
  unknown = "UNKNOWN"
}

export enum ReviewCategory {
  overall = "OVERALL",
  location = "LOCATION",
  cleanliness = "CLEANLINESS",
  checkIn = "CHECK_IN",
  value = "VALUE",
  houseRules = "HOUSE_RULES",
  nps = "NPS",
  accuracy = "ACCURACY",
  communication = "COMMUNICATION"
}

export enum RingDeviceKind {
  chime = "CHIME",
  doorbot = "DOORBOT",
  stickupCamera = "STICKUP_CAMERA"
}

export enum RingEventKind {
  motion = "MOTION",
  other = "OTHER",
  ring = "RING"
}

export enum RiskLevel {
  low = "LOW",
  medium = "MEDIUM",
  veryHigh = "VERY_HIGH",
  undefined = "UNDEFINED",
  high = "HIGH"
}

export enum RoomKind {
  bedroom = "BEDROOM",
  livingSleepingCombo = "LIVING_SLEEPING_COMBO",
  otherSleepingArea = "OTHER_SLEEPING_AREA"
}

export enum ScheduledJobStatus {
  success = "SUCCESS",
  failure = "FAILURE",
  running = "RUNNING"
}

export enum SensorStatus {
  offline = "OFFLINE",
  online = "ONLINE",
  notAvailable = "NOT_AVAILABLE"
}

export enum SortOrder {
  descendingNullsFirst = "DESCENDING_NULLS_FIRST",
  descending = "DESCENDING",
  ascendingNullsLast = "ASCENDING_NULLS_LAST",
  descendingNullsLast = "DESCENDING_NULLS_LAST",
  ascending = "ASCENDING",
  ascendingNullsFirst = "ASCENDING_NULLS_FIRST"
}

export enum TemplateKind {
  email = "EMAIL",
  pushNotification = "PUSH_NOTIFICATION",
  slack = "SLACK",
  sms = "SMS"
}

export enum ThermostatEventType {
  coolingSetpoint = "COOLING_SETPOINT",
  operationState = "OPERATION_STATE",
  mode = "MODE",
  deviceDown = "DEVICE_DOWN",
  fan = "FAN",
  zwaveSignal = "ZWAVE_SIGNAL",
  heatingSetpoint = "HEATING_SETPOINT",
  scheduleId = "SCHEDULE_ID",
  smokeAlarm = "SMOKE_ALARM",
  unknown = "UNKNOWN",
  agentId = "AGENT_ID",
  ruleNo = "RULE_NO",
  offline = "OFFLINE",
  source = "SOURCE",
  motion = "MOTION",
  roomTemp = "ROOM_TEMP",
  triggerBy = "TRIGGER_BY",
  holdUntil = "HOLD_UNTIL"
}

export enum TransactionKind {
  creditCardPayment = "CREDIT_CARD_PAYMENT",
  creditCardRefund = "CREDIT_CARD_REFUND",
  transferFromSecurityDeposit = "TRANSFER_FROM_SECURITY_DEPOSIT",
  ownerPayment = "OWNER_PAYMENT",
  ownerRefund = "OWNER_REFUND",
  wholesaleRefund = "WHOLESALE_REFUND",
  distributionChannelRefund = "DISTRIBUTION_CHANNEL_REFUND",
  stripe = "STRIPE",
  transferToSecurityDeposit = "TRANSFER_TO_SECURITY_DEPOSIT",
  chargeAdjustment = "CHARGE_ADJUSTMENT",
  refundAdjustment = "REFUND_ADJUSTMENT",
  distributionChannelPayment = "DISTRIBUTION_CHANNEL_PAYMENT",
  wholesalePayment = "WHOLESALE_PAYMENT",
  otherRefund = "OTHER_REFUND",
  otherPayment = "OTHER_PAYMENT"
}

export enum ZoneLocation {
  indoor = "INDOOR",
  outdoor = "OUTDOOR"
}

export interface AccessProjection {
  variables: AccessVariableProjection[]
  instructions: AccessInstructionProjection[]
}

export interface AmenityInfo {
  amenityId: UUID
  quantity: number
}

export interface AssetRequest {
  context: AssetContextType
  extension: string
  public: boolean
  targetId?: UUID
  size?: number
  fileName?: string
}

export interface AssetUploadInfo {
  assetId: UUID
  url: string
  externalUrl: string
}

export interface BackOfficeUserMutations {
  activate: boolean
  deactivate: boolean
  delete: boolean
  createOrUpdate: BackOfficeUser
  createOrUpdateBackOfficeRole: BackOfficeRole[]
}

export interface BlockedPeriodInput {
  homeId: UUID
  period: DateRangeInput
  reason: string
  source: BlockedPeriodSource
  sourceId?: UUID
  occupancy: OccupancyStatus
}

export interface BookSectionUpdateInput {
  kind: BookKind
  key: string
  title: string
  defaultText?: string
  regionId?: UUID
}

export interface BookingCodeTemplate {
  title: string
  template: string
}

export interface BookingCodeVariable {
  name: string
  value: string
}

export interface BookingInfoInput {
  checkIn: IDate
  checkOut: IDate
  externalHomeId: string
  externalHomeName?: string
}

export interface BookingMutations {
  saveReviews: boolean
  disableNotUpdatedReviews: number
}

export interface BookingQuoteContactInput {
  fullName: string
  email: string
}

export interface BookingQuoteRequest {
  checkIn: IDate
  checkOut: IDate
  salesFrom?: IDate
  salesTo: IDate
  guests: number
  pets: number
  notes?: string
  contact: BookingQuoteContactInput
  homes: BookingQuoteRequestHome[]
}

export interface BookingQuoteRequestHome {
  homeId: UUID
  plainPrice: number
  quotePrice: number
  discount?: Discount
}

export interface BookingRequest {
  homeId: UUID
  couponCode?: string
  from: IDate
  until: IDate
  guests: number
  pets: number
  notes?: string
  heardAboutUs?: HeardAboutUsInput
  creditCardDetails?: CreditCardDetails
  paymentIntentId?: string
}

export interface BookingUpdateFilter {
  email?: string
  confirmationId?: number
  convertedSince?: IDate
  modifiedSince?: IDate
  arrivingAfter?: IDate
  arrivingBefore?: IDate
  arrivingOn?: IDate
  departingAfter?: IDate
  departingBefore?: IDate
  departingOn?: IDate
  statusCode: ReservationStatusCode
  typeName?: string
  flagFilter?: string
}

export interface CategoryReviewInput {
  category: ReviewCategory
  rating: number
  comment?: string
}

export interface ComplianceMutations {
  saveHomeComplianceInformations: boolean
  deleteHomeComplianceInformation: boolean
}

export interface ContactRequestInput {
  name: string
  email: string
  message: string
}

export interface CouponUpdateInput {
  code: string
  description?: string
  isActive: boolean
  salesFrom?: IDate
  salesTo?: IDate
  bookingPeriodType: CouponBookingPeriodType
  bookingFrom: IDate
  bookingTo: IDate
  applicableTo: CouponHomeApplicableTo
  properties?: UUID[]
  availableForHighSeason: boolean
  maximumUsages: number
  minimumPrice: number
  discountType: DiscountKind
  discountValue: number
}

export interface CreditCardDetails {
  ccType: CreditCardType
  nameOnCard: string
  number: string
  cid: string
  expirationDate: IDate
}

export interface CustomFieldInput {
  id?: UUID
  action: UpdateAction
  name: string
  customFieldSectionId: UUID
  kind: CustomFieldKind
  defaultValue?: string
  values?: CustomFieldValueInput[]
  multipleValues: boolean
  listOrder: number
}

export interface CustomFieldSectionInput {
  id?: UUID
  action: UpdateAction
  name: string
  scope: CustomFieldScope
  listOrder: number
  roles?: CustomFieldSectionRoleInput[]
}

export interface CustomFieldSectionRoleInput {
  customFieldSectionId: UUID
  roleId: UUID
  homeId?: UUID
  bookingId?: UUID
}

export interface CustomFieldValueInput {
  value: string
  listOrder: number
}

export interface CustomFieldValueUpdateInput {
  customFieldId: UUID
  value: string
  internal?: boolean
}

export interface Discount {
  discountKind: DiscountKind
  discountAmount: number
}

export interface ExperienceInput {
  id?: UUID
  title: string
  kind: ExperienceKindName
  regionId: UUID
  period: DateRangeInput
  assetId: UUID
  markdown: string
  latitude: string
  longitude: string
  listOrder?: number
}

export interface ExperienceMutations {
  update: Experience[]
  delete: number
}

export interface ExternalBookingConfirmation {
  id: UUID
  guestName: string
  guestUniqueId: string
  externalPropertyId: string
  confirmationCode: string
  startDate: IDate
  endDate: IDate
  receivedAt: IDate
  source: LeadSource
}

export interface ExternalBookingConfirmationInput {
  guestName: string
  guestUniqueId: string
  externalPropertyId: string
  confirmationCode: string
  receivedAt: IDate
  startDate: IDate
  endDate: IDate
  source: LeadSource
}

export interface HeardAboutUsInput {
  source: HowDidYouHearAboutUs
  other?: string
}

export interface HomeAccessInstructionInput {
  title: string
  template: string
}

export interface HomeAccessInstructionsMutations {
  upsertInstructions: AccessProjection
}

export interface HomeAccessVariableInput {
  templateVariableId?: string
  name: string
  value: string
  fresh: boolean
}

export interface HomeAmenityInput {
  homeId: UUID
  amenityId: UUID
  quantity?: number
  comment?: string
}

export interface HomeBookSectionInput {
  homeId: UUID
  bookKind: BookKind
  key: string
  active: boolean
  text?: string
}

export interface HomeBooksMutations {
  createSection: BookSection
  deleteSection: boolean
  updateSection: boolean
  updateSectionDefaultValue: boolean
  updateSections: boolean
  bindSections: boolean
}

export interface HomeComplianceInformationInput {
  homeId: UUID
  jurisdictionId?: UUID
  permitStatus?: string
  leaseStatus?: string
  rent?: number
  nextRentIncrease?: IDate
  rofr?: boolean
  totalControlLength?: number
  fullyExecutedDate?: IDate
  termCommencementDate?: IDate
  timeBetweenFeTermCommencement?: number
  onboardingTime?: string
  endOfCurrentTerm?: IDate
  term?: string
  renewalOption?: string
  remainingOptions?: number
  sendRenewalNotificationLastDate?: IDate
  renewalRate?: number
  constructionPermit?: string
  inspectionRequiredForAdditionalBedrooms?: boolean
  strPermitNumber?: string
  firstRenewalActionNeeded?: IDate
  activePassiveActionRequired?: string
  strPermitExpiryDate?: IDate
  totPermitNumber?: string
  businessLicenseNumber?: string
  businessLicenseExpiryDate?: IDate
  twctmd?: string
  comment?: string
}

export interface HomeCustomFieldInput {
  customFieldId: UUID
  value: string
}

export interface HomeLeaseInput {
  homeId: UUID
  startDate?: IDate
  endDate?: IDate
  amount: number
  notes?: string
  signDate?: IDate
}

export interface HomeMutations {
  saveHomePerformanceMetrics: boolean
  saveHomeReviewRates: boolean
  saveHomeNoiseReadings: boolean
  saveHomeOccupancyReadings: boolean
  addHomeAmenities: number
  updateHomeAmenities: number
  deleteHomeAmenities: number
}

export interface HomeNoiseReadingInput {
  homeId: UUID
  readings: NoiseReadingInput[]
}

export interface HomeOccupancyReadingInput {
  homeId: UUID
  devices: number
  status: SensorStatus
  threshold: number
  readAt: IDate
  zoneLocation: ZoneLocation
  isUnderAlert: boolean
}

export interface HomePerformanceMetricInput {
  externalHomeId: string
  externalHomeTitle?: string
  date: IDate
  source: LeadSource
  firstPageImpressions?: number
  firstPageImpressionsMkt?: number
  firstPageClicks?: number
  firstPageCtr?: number
  pageViews?: number
  pageViewsMkt?: number
  contactRate?: number
  bookRate?: number
  occupancyRate?: number
  occupancyRateMarket?: number
  occupancyRateYoy?: number
  nightsBooked?: number
  averageNightlyPrice?: number
  averageNightlyPriceMarket?: number
  averageNightlyPriceTop25?: number
  averageNightlyPriceBottom25?: number
  revpar?: number
  revparMarket?: number
  revparYoy?: number
  revparMom?: number
}

export interface HomeReviewRateInput {
  externalHomeId: string
  externalHomeTitle?: string
  date: IDate
  source: LeadSource
  ratingStars: RatingStarsInput[]
}

export interface HomeSharedAccessInstructionInput {
  homeId: UUID
  sharedAccessInstructionId: UUID
  listOrder: number
}

export interface Inquiry {
  id: UUID
  receivedAt: IDate
  email: string
  phone?: string
  guestName: string
  guestUniqueId?: string
  messageId: string
  message: string
  startDate?: IDate
  endDate?: IDate
  isResponse?: boolean
  externalHomeId: string
  source: LeadSource
}

export interface InquiryActionInput {
  label: string
  link: string
}

export interface InquiryInput {
  receivedAt: IDate
  email: string
  guestName: string
  guestPhone?: string
  guestUniqueId?: string
  messageId: string
  message: string
  startDate?: IDate
  endDate?: IDate
  isResponse?: boolean
  externalPropertyId: string
  externalPropertyName?: string
  source: LeadSource
  actions: InquiryActionInput[]
}

export interface Mutation {
  templateVariables: TemplateVariable[]
  updateAllBlocks: boolean
  updateAllBookings: boolean
  updateCutsheets: boolean
  updateCutsheetsPart2: boolean
  republishEvent: boolean
  publicToken: string
  createAsset: AssetUploadInfo
  compliance: ComplianceMutations
  home: HomeMutations
  experience: ExperienceMutations
  createHomeImage: AssetUploadInfo
  updateBlockedPeriod: boolean
  deactivateHome: boolean
  offBoardHome: boolean
  updateHome: boolean
  updateHomeParentId: boolean
  addBuyouts: number
  deleteBuyouts: number
  recursiveDeleteBuyouts: number
  updateHomeRooms: Room[]
  removeHomeRoom: boolean
  removeHomeParentId: boolean
  updateOnBoardingStage: boolean
  updateHomeLease?: HomeLease
  updateRiskLevel: boolean
  updateHomeLivePeriod: boolean
  fetchRingRecordingLink?: string
  sharedAccessInstructions: SharedAccessInstructionsMutations
  homeAccessInstructions: HomeAccessInstructionsMutations
  createAmenity: Amenity
  updateAmenityName: boolean
  deleteAmenity: boolean
  homeBooks: HomeBooksMutations
  changeUnderwrittenRevenue: number
  changeProjectedRevenue: number
  booking: BookingMutations
  updateBooking: Booking[]
  resendMessage: string
  addBookingInquiry: Inquiry
  addBookingConfirmation: ExternalBookingConfirmation
  addBookingCodes: string
  requestBookingReport: string
  requestReviewsReport: string
  updateBookingCustomFieldValues: boolean
  resendCheckInInstructions: boolean
  saveWifiRegistration: string
  resendDocumentRequest: boolean
  createBookingQuote: BookingQuote
  createMarriottBooking: UUID
  requestContact: string
  requestPartnership: string
  requestRetreatProposal: string
  updateCustomFieldSections: ExtendedCustomFieldSection[]
  updateCustomFields: ExtendedCustomField[]
  createCoupon: boolean
  updateStreamlineCoupons: boolean
  enableCoupon: boolean
  disableCoupon: boolean
  updateCoupon: boolean
  updateStreamlineCoupon: boolean
  backOfficeUser: BackOfficeUserMutations
  addToBlacklist: boolean
  addCreditCardToBlacklist: boolean
  removeCreditCardFromBlacklist: boolean
  deleteFromBlacklist: boolean
}

export interface NewContactDetails {
  fullName: string
  email: string
  phone: string
}

export interface NoiseReadingInput {
  zoneName: string
  status: SensorStatus
  noiseLevel: number
  threshold: number
  readAt: IDate
  zoneLocation: ZoneLocation
  isUnderAlert: boolean
}

export interface PartnershipRequestInput {
  name: string
  email: string
  phone: string
  city: string
  message: string
}

export interface ProjectedRevenueInput {
  period: DateRangeInput
  value: number
}

export interface RatingStarsInput {
  category: ReviewCategory
  rates1Stars: number
  rates2Stars: number
  rates3Stars: number
  rates4Stars: number
  rates5Stars: number
}

export interface ReviewInput {
  messageId: string
  response?: string
  privateFeedback?: string
  source: LeadSource
  booking: BookingInfoInput
  categoryReviews: CategoryReviewInput[]
}

export interface RoleInput {
  roleId?: UUID
  name: string
  privileges: BackOfficePrivilege[]
}

export interface RoomUpdate {
  roomId?: UUID
  name: string
  description: string
  kind: RoomKind
  maxOccupancy: number
  area?: string
  bathroomKind: BathroomKind
  images?: UUID[]
  sleepingPlaces?: AmenityInfo[]
  roomAmenities?: AmenityInfo[]
  bathroomAmenities?: AmenityInfo[]
}

export interface SharedAccessInstructionInput {
  title: string
  displayTitle: string
  template: string
  variables: string[]
}

export interface SharedAccessInstructionsMutations {
  upsertInstructions: AccessProjection
}

export interface SharedAccessVariableInput {
  templateVariableId?: string
  name: string
  global: boolean
  value: string
  fresh: boolean
}

export interface StreamlineCoupon {
  streamlineId: number
  id: string
  name: string
}

export interface WifiRegistrationInput {
  homeId?: UUID
  name: string
  email: string
  gender: Gender
  birthYear: number
  userOs: string
  url: string
}

export interface ADR {
  period?: number
  weekdays?: number
  weekends?: number
}

export interface AccessInstructionProjection {
  id: UUID
  homeId?: UUID
  title: string
  displayTitle?: string
  template: string
  listOrder?: number
  isShared: boolean
  createdAt: IDate
  updatedAt?: IDate
}

export interface AccessVariableProjection {
  templateVariableId: string
  name: string
  homeId?: UUID
  global: boolean
  value: string
  isShared: boolean
  createdAt: IDate
  updatedAt?: IDate
}

export interface Address {
  address?: string
  zipCode?: string
  city?: string
  stateId?: UUID
  countryCode?: string
  regionId?: UUID
  state?: State
  region?: Region
}

export interface AirBnbHomeRatings {
  overall?: ReviewRate
  accuracy?: ReviewRate
  checkIn?: ReviewRate
  communication?: ReviewRate
  cleanliness?: ReviewRate
  location?: ReviewRate
  value?: ReviewRate
}

export interface Amenity {
  id: UUID
  amenityGroupId: UUID
  active: boolean
  name: string
  scope: AmenityScope
  createdAt: IDate
  updatedAt?: IDate
}

export interface AmenityProjection {
  id: UUID
  name: string
  amenityGroupId: UUID
  amenityGroupName: string
  scope: AmenityScope
}

export interface Asset {
  id: UUID
  context: AssetContextType
  s3Bucket: string
  s3Key: string
  public: boolean
  targetId?: UUID
  createdAt: IDate
  updatedAt?: IDate
  extension?: string
  size?: number
  fileName?: string
  url: string
}

export interface AttachmentView {
  name: string
  url: string
}

export interface AvailableRevenue {
  date: IDate
  value: number
}

export interface BackOfficeRole {
  id: UUID
  name: string
  privileges: BackOfficePrivilege[]
  createdAt: IDate
  updatedAt?: IDate
}

export interface BackOfficeUser {
  email: string
  name: string
  privileges: BackOfficePrivilege[]
  active: boolean
  lastAccessAt?: IDate
  createdAt: IDate
  updatedAt?: IDate
  roles: BackOfficeRole[]
}

export interface Bathroom {
  id: UUID
  homeId: UUID
  listOrder: number
  name: string
  kind: BathroomKind
  createdAt: IDate
  updatedAt?: IDate
  amenities: BathroomAmenity[]
}

export interface BathroomAmenity {
  bathroomId: UUID
  amenityId: UUID
  name: string
}

export interface Benchmark {
  id: UUID
  data: Data[]
}

export interface BlacklistedCreditCard {
  number: string
}

export interface BlacklistedCreditCardResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: BlacklistedCreditCard[]
}

export interface BlacklistedEmail {
  email: string
}

export interface BlacklistedEmailResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: BlacklistedEmail[]
}

export interface BlockedPeriod {
  id: UUID
  homeId: UUID
  period: DateRange
  reason: string
  source: BlockedPeriodSource
  sourceId?: UUID
  occupancyStatus: OccupancyStatus
}

export interface BookSection {
  bookKind: BookKind
  key: string
  listOrder: number
  title: string
  defaultValue?: string
  createdAt: IDate
  updatedAt?: IDate
  propertiesUsing: UUID[]
  region?: Region
}

export interface Booking {
  id: UUID
  hash: string
  source: LeadSource
  userId?: UUID
  guestName: string
  emails: string[]
  phones: string[]
  address: Address
  guestId: UUID
  homeId: UUID
  couponCode?: string
  period: DateRange
  guests: number
  pets: number
  status: BookingStatus
  notes?: string
  heardAboutUs: HowDidYouHearAboutUs
  additionalData: string
  createdAt: IDate
  updatedAt?: IDate
  confirmationId?: number
  reservationId?: number
  aboutUsDetails?: string
  paymentDetails: BookingPaymentDetails
  home: Home
  wifiRegistrations: WifiRegistration[]
  guestList: Person[]
  checkIn: IDate
  checkOut: IDate
  changeRequests: BookingChangeRequest[]
  appDownloads: number
  guestsWhoDownloaded: Person[]
  reviews: Review[]
  tier: BookingTier
  attachments: AttachmentView[]
  customFields: CustomFieldSectionProjection[]
  messagesSent: PersonNotifyLog[]
  lockCode?: BookingLockCode
  externalLinks: BookingExternalLinks
  links: BookingLinks
}

export interface BookingChangeRequest {
  id: UUID
  bookingId: UUID
  oldDate: IDate
  newDate: IDate
  personId: UUID
  kind: BookingChangeRequestKind
  status: BookingChangeRequestStatus
  reviewedAt?: IDate
  reviewedBy?: string
  reprovedReason?: string
  slackNotificationTs?: string
  createdAt: IDate
  updatedAt?: IDate
}

export interface BookingExternalLinks {
  streamline?: string
  bookingConfirmation: string
  checkInInstructions: string
  webManual: string
}

export interface BookingFee {
  name: string
  feeKind: FeeKind
  amount: number
}

export interface BookingLinks {
  streamline?: string
  checkInInstructions: string
  manual: string
  frontapp?: string
}

export interface BookingLockCode {
  bookingId: UUID
  lockTypeId: UUID
  code: string
  createdAt: IDate
  updatedAt?: IDate
}

export interface BookingPaymentDetails {
  taxesAndFees: BookingFee[]
  rates: BookingRate[]
  transactions: BookingTransaction[]
  isPaid: boolean
  totalPaid: number
  totalPrice: number
  balance: number
}

export interface BookingQuote {
  id: UUID
  guests: number
  pets: number
  checkIn: IDate
  checkOut: IDate
  salesFrom?: IDate
  salesTo: IDate
  createdAt: IDate
  homeQuote: BookingQuoteCoupon[]
  guest: Person
  user?: User
  notifyLog: PersonNotifyLog[]
}

export interface BookingQuoteCoupon {
  plainPrice: number
  quotePrice: number
  discount: DiscountInput
  coupon: Coupon
}

export interface BookingQuoteResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: BookingQuote[]
}

export interface BookingRate {
  season: string
  date: IDate
  price: number
  extra: number
  discount: number
  grossPrice: number
}

export interface BookingResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Booking[]
}

export interface BookingTransaction {
  id: UUID
  date: IDate
  transactionKind: TransactionKind
  processedBy?: string
  creditCardType: CreditCardType
  creditCardNumber?: string
  creditCardExpiration?: IDate
  amount: number
  createdAt: IDate
}

export interface BookingVolumeLeadTime {
  createdAt: IDate
  leadTimeFrom: number
  leadTimeUntil: number
  amount: number
}

export interface BookingWithIssues {
  booking: Booking
  issues: BookingIssue[]
}

export interface Category {
  id: UUID
  name: string
}

export interface CategoryReview {
  category: ReviewCategory
  rating: number
  comment?: string
}

export interface ChannelDistribution {
  channelName: string
  percentage: number
  total: number
}

export interface ComplianceQueries {
  jurisdictions: Jurisdiction[]
}

export interface ConfigurationStatus {
  strPermit: boolean
  galleryPicturesCount: number
  lockType?: string
  fallbackCode: HomeConfigAuditStatus
  accessInstructions: HomeConfigAuditStatus
  manualSections: number
  rooms: HomeConfigRoomsAudit
  pricing: HomeConfigAuditStatus
  occupancySensors: SensorStatus
  noiseSensors: HomeNoiseSensorStatus
  ringDevices: HomeRingDeviceStatus
}

export interface ConversationContext {
  contact?: Person
  currentBooking?: Booking
  allBookings: Booking[]
  inquiries: JaimitoInquiry[]
}

export interface Coupon {
  code: string
  streamlineCouponId?: string
  description?: string
  isActive: boolean
  salesFrom?: IDate
  salesTo?: IDate
  bookingPeriodType: CouponBookingPeriodType
  bookingFrom: IDate
  bookingTo: IDate
  applicableTo: CouponHomeApplicableTo
  availableForHighSeason: boolean
  maximumUsages?: number
  minimumPrice: number
  discountType: DiscountKind
  discountValue: number
  createdAt: IDate
  updatedAt?: IDate
  usageCount: number
  homes: Home[]
  usages: number
  isValidFor: boolean
  validForHomes: UUID[]
}

export interface CouponCounters {
  active: number
  inactive: number
  expired: number
  total: number
}

export interface CouponProjectionResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Coupon[]
}

export interface CustomFieldProjection {
  id: UUID
  kind: CustomFieldKind
  name: string
  listOrder: number
  value?: string
  valueIsDefault: boolean
  options: string[]
  internal?: boolean
  createdAt?: IDate
  updatedAt?: IDate
  assets: Asset[]
}

export interface CustomFieldSectionProjection {
  section: ExtendedCustomFieldSection
  fields: CustomFieldProjection[]
}

export interface CustomFieldValue {
  value: string
  listOrder: number
}

export interface CustomerExperienceIndicators {
  nps: number
  airbnbSuperhostRating?: number
  lastAirbnbSuperhostRatingUpdated?: IDate
  airbnbSuperhostPeriod: DateRange
  airbnbFiveStarReviewsToSuperhost: number
  totalNumberOfPainBookings: Indicator
  newReviews: Indicator
  painBookings: Indicator
  reviewsConversion: number
  painReservationPercent: number
  avgRating: number
  positiveReviews: number
}

export interface Data {
  month: IDate
  current?: number
  past?: number
  projected?: number
}

export interface DateRange {
  start: IDate
  end: IDate
}

export interface DateRangeInput {
  start: IDate
  end: IDate
}

export interface DayCount {
  date: IDate
  count: number
}

export interface DayEntry {
  date: IDate
  occupied: boolean
  inactive: boolean
}

export interface DiscountInput {
  discountKind: DiscountKind
  discountAmount: number
}

export interface EventProjection {
  eventId: UUID
  eventDate: IDate
  tags: string
  kind: string
  data: string
  sourceKind: EventSourceKind
  source?: UUID
}

export interface Experience {
  id: UUID
  title: string
  kind: ExperienceKindName
  regionId: UUID
  period: DateRange
  markdown: string
  longitude: string
  latitude: string
  listOrder: number
  createdAt: IDate
  updatedAt?: IDate
  image?: Asset
}

export interface ExperienceResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Experience[]
}

export interface ExtendedCustomField {
  id: UUID
  name: string
  customFieldSectionId: UUID
  kind: CustomFieldKind
  listOrder: number
  defaultValue?: string
  multipleValues: boolean
  enabled: boolean
  createdAt: IDate
  updatedAt?: IDate
  values: CustomFieldValue[]
  assets: Asset[]
}

export interface ExtendedCustomFieldSection {
  id: UUID
  name: string
  scope: CustomFieldScope
  listOrder: number
  readOnly: boolean
  kind: CustomFieldSectionKind
  enabled: boolean
  customFields: ExtendedCustomField[]
}

export interface FinanceIndicators {
  strLtrCoefficient: number
  discounts: Indicator
  averageDiscount: Indicator
  securityDeposits: Indicator
  petDeposits: Indicator
  outstandingPayments: Indicator
  bookingVolume: Indicator
  bookingVolumePerProperty: Indicator
  bookingVolumePerCheckInPeriod: BookingVolumeLeadTime[]
  realizedRevenue: Indicator
  realizedRevenuePerProperty: Indicator
  futureRevenue: FutureRevenue[]
  projectedRevenue: Indicator
  projectedRevenuePerProperty: Indicator
  underwrittenRevenue: Indicator
  availableRevenue: AvailableRevenue[]
  adr?: ADR
  revpau?: RevPAU
}

export interface FutureRevenue {
  date: IDate
  projected: number
  booked: number
  paid: number
}

export interface Home {
  id: UUID
  name: string
  title: string
  description: string
  shortDescription: string
  keywords: string[]
  maxAdults: number
  maxOccupancy: number
  maxPets: number
  area: string
  latitude?: string
  longitude?: string
  couponsAllowed: boolean
  longTermAllowed: boolean
  shortTermAllowed: boolean
  active: boolean
  virtual: boolean
  listed: boolean
  address: Address
  normalizedName: string
  roomsCount: number
  bathroomsCount: string
  bedsCount: number
  floorsCount: number
  createdAt: IDate
  updatedAt?: IDate
  hash?: string
  calendar: HomeDateStatus[]
  sensorStatuses: SensorStatus[]
  thermostats: ThermostatDevice[]
  liveStatus: HomeLiveStatus
  details: HomeDetails
  parent?: Home
  children: Home[]
  thumbnail?: Asset
  links: HomeLinks
  region?: Region
  reviews: ReviewResultsPage
  homeAmenities: HomeAmenity[]
  rooms: Room[]
  liveNoiseLevel: HomeNoiseReading[]
  liveOccupancy?: HomeOccupancyReading
  leases: HomeLease[]
  compliances?: HomeComplianceInformation
  activeLeaseMonthlyAmount?: number
  bathrooms: Bathroom[]
  images: Asset[]
  ratings?: HomeReviewRatingsView
  notes: HomeNotes[]
  airdnaLtmRentalizer: RentalizerLtmView
  customFields: CustomFieldSectionProjection[]
  bookings: BookingResultsPage
  ongoingBooking?: Booking
  book: HomeBook
  tags: Tag[]
  maintenanceStatus: MaintenanceStatus
  indicators: HomeIndicators
  upcomingWeekendsOccupancy: DayEntry[][]
  inquiriesByDay: DayCount[]
  inquiriesCount: number
  upcomingWeekendsRelativeOccupancy: number
  projectedRevenues: ProjectedRevenue[]
  ringDevices: RingDevice[]
  ringDevicesHistory: RingEventResultsPage
  sourceListed: HomeSourceListedView
  configurationStatus: ConfigurationStatus
  pricingHistory: PricingHistoryProjectionResultsPage
  channels: HomeListing[]
  blockedHomes: Home[]
  accessVariables: AccessVariableProjection[]
  accessInstructions: AccessInstructionProjection[]
}

export interface HomeAmenity {
  homeId: UUID
  amenityId: UUID
  quantity?: number
  comment?: string
}

export interface HomeAwayHomeRatings {
  overall?: ReviewRate
}

export interface HomeBook {
  sections: HomeBookSection[]
}

export interface HomeBookSection {
  homeId: UUID
  bookKind: BookKind
  key: string
  title: string
  listOrder: number
  active: boolean
  defaultValue?: string
  value?: string
}

export interface HomeComplianceInformation {
  permitStatus?: string
  leaseStatus?: string
  rent?: number
  nextRentIncrease?: IDate
  rofr?: boolean
  totalControlLength?: number
  fullyExecutedDate?: IDate
  termCommencementDate?: IDate
  timeBetweenFeTermCommencement?: number
  onboardingTime?: string
  endOfCurrentTerm?: IDate
  term?: string
  renewalOption?: string
  remainingOptions?: number
  sendRenewalNotificationLastDate?: IDate
  renewalRate?: number
  constructionPermit?: string
  inspectionRequiredForAdditionalBedrooms?: boolean
  strPermitNumber?: string
  firstRenewalActionNeeded?: IDate
  activePassiveActionRequired?: string
  strPermitExpiryDate?: IDate
  totPermitNumber?: string
  businessLicenseNumber?: string
  businessLicenseExpiryDate?: IDate
  twctmd?: string
  comment?: string
  jurisdiction?: Jurisdiction
}

export interface HomeConfigRoomsAudit {
  total: number
  configured: number
}

export interface HomeDateStatus {
  date: IDate
  minStay?: number
  season?: string
  rate?: number
  status: HomeDateOccupancyStatus
}

export interface HomeDetails {
  liveSince?: IDate
  liveUntil?: IDate
  maintenanceStatus: MaintenanceStatus
  onBoardingStage: OnBoardingStage
  riskLevel: RiskLevel
  riskReasoning?: string
  publishHighRisk: boolean
  lockTypeId?: UUID
  additionalData?: string
  wheelchairAccessible?: string
  onBoardingStatus: OnBoardingStatus
}

export interface HomeFinanceIndicators {
  health: number
  strLtrCoefficient: number
  discounts: Indicator
  averageDiscount: Indicator
  securityDeposits: Indicator
  petDeposits: Indicator
  outstandingPayments: Indicator
  bookingVolume: Indicator
  bookingVolumePerCheckInPeriod: BookingVolumeLeadTime[]
  realizedRevenue: Indicator
  futureRevenue: FutureRevenue[]
  projectedRevenue: Indicator
  underwrittenRevenue: Indicator
  availableRevenue: AvailableRevenue[]
  adr?: ADR
  revpau?: RevPAU
}

export interface HomeIndicators {
  finance: HomeFinanceIndicators
  sales: SalesIndicators
  customerExperience: CustomerExperienceIndicators
  operations: OperationsIndicators
}

export interface HomeLeadSourceIdInput {
  source: LeadSource
  externalHomeId: string
}

export interface HomeLease {
  id: UUID
  homeId: UUID
  startDate?: IDate
  endDate?: IDate
  amount: number
  notes?: string
  signDate?: IDate
}

export interface HomeLinks {
  streamline?: string
  listings: ListingLink[]
  manual: string
}

export interface HomeListing {
  homeId: UUID
  source: LeadSource
  title: string
  properties: string
  active: boolean
  externalHomeId?: string
  createdAt: IDate
  updatedAt?: IDate
}

export interface HomeNoiseReading {
  zoneName: string
  status: SensorStatus
  noiseLevel: number
  threshold: number
  underAlert: boolean
  zoneLocation: ZoneLocation
  readAt: IDate
}

export interface HomeNoiseSensorStatus {
  online: number
  total: number
}

export interface HomeNotes {
  id: UUID
  homeId: UUID
  message: string
  agentId: UUID
  createdAt: IDate
  updatedAt?: IDate
}

export interface HomeOccupancyReading {
  status: SensorStatus
  devices: number
  threshold: number
  underAlert: boolean
  zoneLocation: ZoneLocation
  readAt: IDate
}

export interface HomeResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Home[]
}

export interface HomeReviewRatingsView {
  airBnb: AirBnbHomeRatings
  homeAway: HomeAwayHomeRatings
}

export interface HomeSourceListedCounterView {
  website: number
  airBnb: number
  homeAway: number
}

export interface HomeSourceListedView {
  website: boolean
  airBnb: boolean
  homeAway: boolean
}

export interface HomesCountingView {
  homes: number
  listings: number
  preLiveTotal: number
  preOnBoarding: number
  onBoarding: number
  bookable: number
  live: number
  new: number
  stabilized: number
  unknown: number
  liveTotal: number
  newTotal: number
}

export interface InboxQueries {
  conversationContext: ConversationContext
}

export interface Indicator {
  period: DateRange
  granularity: Granularity
  aggregation: Aggregation
  aggregatedValue: number
  mostRecentValue: number
  annualizedValue: number
  variation: number
  values: IndicatorEntry[]
}

export interface IndicatorEntry {
  date: IDate
  value: number
}

export interface Indicators {
  finance: FinanceIndicators
  sales: SalesIndicators
  customerExperience: CustomerExperienceIndicators
  operations: OperationsIndicators
}

export interface InsightsFields {
  gaAccessToken: string
  firstAppLogins: MonthCountProjection[]
  bookingsCountByMonth: MonthCountProjection[]
  bookingsWithLoginsCountByMonth: MonthCountProjection[]
  occupancyVersusInquiriesPerHome: OccupancyInquiriesPerHomeProjection[]
  occupancyVersusInquiriesPerRegion: OccupancyInquiriesPerRegionProjection[]
}

export interface JaimitoInquiry {
  guestName?: string
  guestPhone?: string
  email?: string
  message?: string
  inquiryId?: string
  isResponse?: boolean
  startDate?: IDate
  endDate?: IDate
  source: LeadSource
  receivedAt?: IDate
  home?: Home
}

export interface Jurisdiction {
  id: UUID
  name: string
}

export interface ListingLink {
  leadSource: LeadSource
  url: string
}

export interface LockType {
  id: UUID
  name: string
  variables: TemplateVariable[]
}

export interface MonthCountProjection {
  date: IDate
  count: number
}

export interface OccupancyInquiriesPerHomeProjection {
  home: Home
  data: OccupancyInquiriesProjection[]
}

export interface OccupancyInquiriesPerRegionProjection {
  region: Region
  numberOfHomes: number
  data: OccupancyInquiriesProjection[]
}

export interface OccupancyInquiriesProjection {
  startDate: IDate
  endDate: IDate
  occupancy: number
  inquiries: number
  inquiriesPerProperties: number
  inquiriesPerAvailableProperties: number
}

export interface OmniSearchResults {
  users: User[]
  bookings: Booking[]
  homes: Home[]
}

export interface OperationsIndicators {
  checkIns: Indicator
  checkOuts: Indicator
  preStayInspections: Indicator
  postStayInspections: Indicator
  inspectionRate: number
  openWorkOrders: Indicator
  closedWorkOrders: Indicator
}

export interface Pagination {
  page: number
  size: number
}

export interface PaginationInput {
  page: number
  size: number
}

export interface Person {
  id: UUID
  fullName: string
  emails: string[]
  phones: string[]
  address: Address
  createdAt: IDate
  updatedAt?: IDate
  firstName: string
  lastName: string
  user?: User
}

export interface PersonNotifyLog {
  id: UUID
  personId?: UUID
  bookingId?: UUID
  subject?: string
  message: string
  phones: string[]
  emails: string[]
  templateName: string
  templateKind: TemplateKind
  status: PersonNotifyLogStatus
  additionalData: string
  createdAt: IDate
  person?: Person
  textMessage: string
}

export interface PricingHistory {
  homeId: UUID
  rateType: RateType
  author: string
  createdAt: IDate
  updatedAt?: IDate
  prevAmount: number
  newAmount: number
  changeType: string
  date?: IDate
  seasonAndDay?: SeasonAndDay
  home: Home
}

export interface PricingHistoryProjectionResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: PricingHistory[]
}

export interface ProjectedRevenue {
  id: UUID
  homeId: UUID
  period: DateRange
  value: number
}

export interface ProspectPartner {
  id: UUID
  fullName: string
  email: string
  phone?: string
  address: string
  bedrooms: number
  bathrooms: string
  accommodates: number
  ltmRevenue: number
  ltmRevenueLower: number
  ltmRevenueUpper: number
  ltmOccupancy: number
  createdAt: IDate
}

export interface Query {
  globalIndicators: Indicators
  insights: InsightsFields
  region?: RegionFull
  regions: RegionResultsPage
  compliance: ComplianceQueries
  home?: Home
  homeByListing?: Home
  homes: HomeResultsPage
  experiences: ExperienceResultsPage
  homesCounting: HomesCountingView
  homesSourceListedCounting: HomeSourceListedCounterView
  sharedAccessInstructions: SharedAccessInstruction[]
  sharedAccessVariables: AccessVariableProjection[]
  blockedPeriods: BlockedPeriod[]
  homeRoomAmenities: RoomAmenities
  homeFuzzySearch?: Home
  pricingHistory: PricingHistoryProjectionResultsPage
  pricingHistoryLink: string
  requestExportPricingDetails: string
  requestExportPricingDetailsToEmail: boolean
  amenities: AmenityProjection[]
  blockedHomes: Home[]
  ancestors: UUID[]
  successors: UUID[]
  homeBook: HomeBook
  bookSections: BookSection[]
  bookSectionsForRegion: BookSection[]
  bookSectionHistory: EventProjection[]
  homeBookSectionHistory: EventProjection[]
  occupancyBenchmarkByHomes: Benchmark[]
  occupancyBenchmarkByRegions: Benchmark[]
  realizedRevenueBenchmarkByHome: Benchmark[]
  realizedRevenueBenchmarkByRegion: Benchmark[]
  bookedRevenueBenchmarkByHome: Benchmark[]
  bookedRevenueBenchmarkByRegion: Benchmark[]
  lockTypes: LockType[]
  booking: Booking
  bookingQuotes: BookingQuoteResultsPage
  pendingBookingIssues: BookingWithIssues[]
  bookings: BookingResultsPage
  bookingPersonNotifyLogs: PersonNotifyLog[]
  personNotifyLogs?: PersonNotifyLog
  reviews: ReviewResultsPage
  configurationFields: CustomFieldSectionProjection[]
  customFields: ExtendedCustomField[]
  customFieldSections: ExtendedCustomFieldSection[]
  coupon?: Coupon
  coupons: CouponProjectionResultsPage
  couponCounters: CouponCounters
  me?: BackOfficeUser
  backOfficeUser?: BackOfficeUser
  backOfficeUsers: BackOfficeUser[]
  backOfficePrivileges: BackOfficePrivilege[]
  blacklistedCreditCards: BlacklistedCreditCardResultsPage
  blacklistedEmails: BlacklistedEmailResultsPage
  roles: BackOfficeRole[]
  person?: Person
  scheduledJobRuns: ScheduledJobRun[]
  scheduledJobRun: ScheduledJobRun
  prospectPartners: ProspectPartner[]
  omniSearch: OmniSearchResults
  inbox: InboxQueries
}

export interface Region {
  id: UUID
  name: string
  timezone: string
  active: boolean
  photoUrl: string
  homeCount: number
}

export interface RegionCustomerExperienceIndicators {
  nps: number
  lastAirbnbSuperhostRatingUpdated?: IDate
  totalNumberOfPainBookings: Indicator
  painBookings: Indicator
  reviewsConversion: number
  painReservationPercent: number
  avgRating: number
  positiveReviews: number
}

export interface RegionFinanceIndicators {
  health: number
  strLtrCoefficient: number
  bookingVolume: Indicator
  bookingVolumePerProperty: Indicator
  realizedRevenue: Indicator
  realizedRevenuePerProperty: Indicator
  futureRevenue: FutureRevenue[]
  projectedRevenue: Indicator
  projectedRevenuePerProperty: Indicator
}

export interface RegionFull {
  id: UUID
  name: string
  timezone: string
  active: boolean
  photoUrl: string
  homeCount: number
  upcomingWeekendsRelativeOccupancy: number
  activeLeaseMonthlyAmount?: number
  activeLeaseMonthlyAmountPerProperty?: number
  ratings?: HomeReviewRatingsView
  reviews: ReviewResultsPage
  indicators: RegionIndicators
}

export interface RegionIndicators {
  finance: RegionFinanceIndicators
  sales: RegionSalesIndicators
  customerExperience: RegionCustomerExperienceIndicators
}

export interface RegionResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: RegionFull[]
}

export interface RegionSalesIndicators {
  occupancyRate: Indicator
  weekendOccupancyRate: Indicator
}

export interface RentalizerLtmView {
  averageDailyRate: number
  occupancy: number
  revenueMonthly: number
}

export interface RevPAU {
  period?: number
  weekdays?: number
  weekends?: number
}

export interface Review {
  id: UUID
  source: LeadSource
  privateFeedback?: string
  response?: string
  bookingPeriod: DateRange
  externalHomeId: string
  externalReviewId?: string
  active: boolean
  createdAt: IDate
  updatedAt?: IDate
  categoryReviews: CategoryReview[]
  booking?: Booking
  home?: Home
}

export interface ReviewRate {
  rates1Stars: number
  rates2Stars: number
  rates3Stars: number
  rates4Stars: number
  rates5Stars: number
  totalRates: number
  avgStars?: number
}

export interface ReviewResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Review[]
}

export interface RingDevice {
  id: UUID
  homeId?: UUID
  deviceKind: RingDeviceKind
  locationId: UUID
  name: string
  deviceId: string
  batteryLife?: string
  address: string
  latitude?: string
  longitude?: string
  active: boolean
  history: RingEventResultsPage
}

export interface RingEvent {
  id: UUID
  deviceId: UUID
  eventKind: RingEventKind
  duration: number
  answered: boolean
  createdAt: IDate
  occupancy?: HomeOccupancyReading
  noiseLevel: HomeNoiseReading[]
}

export interface RingEventResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: RingEvent[]
}

export interface Room {
  id: UUID
  listOrder: number
  name: string
  description: string
  kind: RoomKind
  maxOccupancy?: number
  area?: string
  bathroomKind: BathroomKind
  thumbnail?: Asset
  images: Asset[]
  sleepingPlaces: RoomAmenity[]
  roomAmenities: RoomAmenity[]
  bathroomAmenities: RoomAmenity[]
}

export interface RoomAmenities {
  sleepingPlaces: Amenity[]
  roomAmenities: Amenity[]
  bathroomAmenities: Amenity[]
}

export interface RoomAmenity {
  roomId: UUID
  amenityId: UUID
  quantity: number
  name: string
}

export interface SalesIndicators {
  averageBookingLength: Indicator
  medianBookingLeadTime: Indicator
  averageGroupSize: Indicator
  cancelledBookings: Indicator
  returningGuests: Indicator
  channelDistribution: ChannelDistribution[]
  bookings: Indicator
  occupancyRate: Indicator
  weekendOccupancyRate: Indicator
}

export interface ScheduledJobRun {
  id: UUID
  job: string
  triggeredAt: IDate
  executionTime: number
  status: ScheduledJobStatus
  output: string
  steps: ScheduledJobRunStep[]
}

export interface ScheduledJobRunStep {
  id: UUID
  jobRunId: UUID
  stepName: string
  targetEntityType?: string
  targetEntityId?: string
  triggeredAt: IDate
  executionTime: number
  status: ScheduledJobStatus
  output: string
}

export interface SeasonAndDay {
  season: string
  day: string
}

export interface SharedAccessInstruction {
  id: UUID
  title: string
  displayTitle: string
  template: string
  createdAt: IDate
  updatedAt?: IDate
  countHomeUses: number
  variables: AccessVariableProjection[]
}

export interface State {
  id: UUID
  name: string
  code: string
  countryCode: string
}

export interface Tag {
  id: UUID
  category: Category
  name: string
}

export interface TemplateVariable {
  id: string
  dynamic: boolean
  name: string
}

export interface ThermostatDevice {
  id: UUID
  hubId: UUID
  name: string
  serialNumber: number
  online: boolean
  temperature: number
  triggeredAt: IDate
  events: ThermostatEvent[]
}

export interface ThermostatEvent {
  deviceId: UUID
  activityType: ThermostatEventType
  message?: string
  triggeredAt: IDate
}

export interface User {
  id: UUID
  personId: UUID
  email?: string
  emailConfirmed: boolean
  active: boolean
  termId?: string
  createdAt: IDate
  updatedAt: IDate
  hasMobileAppInstalled: boolean
}

export interface WifiRegistration {
  bookingId?: UUID
  name: string
  email: string
  gender: Gender
  birthYear: number
  userOs: string
  url: string
  createdAt: IDate
}

export interface AccessProjectionSelection {
  variables?: AccessVariableProjectionSelection
  instructions?: AccessInstructionProjectionSelection
}

export interface AmenityInfoSelection {
  amenityId?: boolean
  quantity?: boolean
}

export interface AssetRequestSelection {
  context?: boolean
  extension?: boolean
  public?: boolean
  targetId?: boolean
  size?: boolean
  fileName?: boolean
}

export interface AssetUploadInfoSelection {
  assetId?: boolean
  url?: boolean
  externalUrl?: boolean
}

export interface BackOfficeUserMutationsSelection {
  activate?: { __args: { email: string } }
  deactivate?: { __args: { email: string } }
  delete?: { __args: { email: string } }
  createOrUpdate?: {
    __args: {
      email: string
      name: string
      privileges: BackOfficePrivilege[]
      roles?: UUID[]
    }
  } & BackOfficeUserSelection
  createOrUpdateBackOfficeRole?: {
    __args: { roles: RoleInput[] }
  } & BackOfficeRoleSelection
}

export interface BlockedPeriodInputSelection {
  homeId?: boolean
  period?: DateRangeInputSelection
  reason?: boolean
  source?: boolean
  sourceId?: boolean
  occupancy?: boolean
}

export interface BookSectionUpdateInputSelection {
  kind?: boolean
  key?: boolean
  title?: boolean
  defaultText?: boolean
  regionId?: boolean
}

export interface BookingCodeTemplateSelection {
  title?: boolean
  template?: boolean
}

export interface BookingCodeVariableSelection {
  name?: boolean
  value?: boolean
}

export interface BookingInfoInputSelection {
  checkIn?: boolean
  checkOut?: boolean
  externalHomeId?: boolean
  externalHomeName?: boolean
}

export interface BookingMutationsSelection {
  saveReviews?: { __args: { reviews: ReviewInput[] } }
  disableNotUpdatedReviews?: { __args: { source: LeadSource } }
}

export interface BookingQuoteContactInputSelection {
  fullName?: boolean
  email?: boolean
}

export interface BookingQuoteRequestSelection {
  checkIn?: boolean
  checkOut?: boolean
  salesFrom?: boolean
  salesTo?: boolean
  guests?: boolean
  pets?: boolean
  notes?: boolean
  contact?: BookingQuoteContactInputSelection
  homes?: BookingQuoteRequestHomeSelection
}

export interface BookingQuoteRequestHomeSelection {
  homeId?: boolean
  plainPrice?: boolean
  quotePrice?: boolean
  discount?: DiscountSelection
}

export interface BookingRequestSelection {
  homeId?: boolean
  couponCode?: boolean
  from?: boolean
  until?: boolean
  guests?: boolean
  pets?: boolean
  notes?: boolean
  heardAboutUs?: HeardAboutUsInputSelection
  creditCardDetails?: CreditCardDetailsSelection
  paymentIntentId?: boolean
}

export interface BookingUpdateFilterSelection {
  email?: boolean
  confirmationId?: boolean
  convertedSince?: boolean
  modifiedSince?: boolean
  arrivingAfter?: boolean
  arrivingBefore?: boolean
  arrivingOn?: boolean
  departingAfter?: boolean
  departingBefore?: boolean
  departingOn?: boolean
  statusCode?: boolean
  typeName?: boolean
  flagFilter?: boolean
}

export interface CategoryReviewInputSelection {
  category?: boolean
  rating?: boolean
  comment?: boolean
}

export interface ComplianceMutationsSelection {
  saveHomeComplianceInformations?: {
    __args: { homeComplianceInformations: HomeComplianceInformationInput[] }
  }
  deleteHomeComplianceInformation?: { __args: { homeId: UUID } }
}

export interface ContactRequestInputSelection {
  name?: boolean
  email?: boolean
  message?: boolean
}

export interface CouponUpdateInputSelection {
  code?: boolean
  description?: boolean
  isActive?: boolean
  salesFrom?: boolean
  salesTo?: boolean
  bookingPeriodType?: boolean
  bookingFrom?: boolean
  bookingTo?: boolean
  applicableTo?: boolean
  properties?: boolean
  availableForHighSeason?: boolean
  maximumUsages?: boolean
  minimumPrice?: boolean
  discountType?: boolean
  discountValue?: boolean
}

export interface CreditCardDetailsSelection {
  ccType?: boolean
  nameOnCard?: boolean
  number?: boolean
  cid?: boolean
  expirationDate?: boolean
}

export interface CustomFieldInputSelection {
  id?: boolean
  action?: boolean
  name?: boolean
  customFieldSectionId?: boolean
  kind?: boolean
  defaultValue?: boolean
  values?: CustomFieldValueInputSelection
  multipleValues?: boolean
  listOrder?: boolean
}

export interface CustomFieldSectionInputSelection {
  id?: boolean
  action?: boolean
  name?: boolean
  scope?: boolean
  listOrder?: boolean
  roles?: CustomFieldSectionRoleInputSelection
}

export interface CustomFieldSectionRoleInputSelection {
  customFieldSectionId?: boolean
  roleId?: boolean
  homeId?: boolean
  bookingId?: boolean
}

export interface CustomFieldValueInputSelection {
  value?: boolean
  listOrder?: boolean
}

export interface CustomFieldValueUpdateInputSelection {
  customFieldId?: boolean
  value?: boolean
  internal?: boolean
}

export interface DiscountSelection {
  discountKind?: boolean
  discountAmount?: boolean
}

export interface ExperienceInputSelection {
  id?: boolean
  title?: boolean
  kind?: boolean
  regionId?: boolean
  period?: DateRangeInputSelection
  assetId?: boolean
  markdown?: boolean
  latitude?: boolean
  longitude?: boolean
  listOrder?: boolean
}

export interface ExperienceMutationsSelection {
  update?: {
    __args: { experienceInputs: ExperienceInput[] }
  } & ExperienceSelection
  delete?: { __args: { experienceIds: UUID[] } }
}

export interface ExternalBookingConfirmationSelection {
  id?: boolean
  guestName?: boolean
  guestUniqueId?: boolean
  externalPropertyId?: boolean
  confirmationCode?: boolean
  startDate?: boolean
  endDate?: boolean
  receivedAt?: boolean
  source?: boolean
}

export interface ExternalBookingConfirmationInputSelection {
  guestName?: boolean
  guestUniqueId?: boolean
  externalPropertyId?: boolean
  confirmationCode?: boolean
  receivedAt?: boolean
  startDate?: boolean
  endDate?: boolean
  source?: boolean
}

export interface HeardAboutUsInputSelection {
  source?: boolean
  other?: boolean
}

export interface HomeAccessInstructionInputSelection {
  title?: boolean
  template?: boolean
}

export interface HomeAccessInstructionsMutationsSelection {
  upsertInstructions?: {
    __args: {
      homeId: UUID
      lockTypeId?: UUID
      variables: HomeAccessVariableInput[]
      instructions: HomeAccessInstructionInput[]
      shared: HomeSharedAccessInstructionInput[]
    }
  } & AccessProjectionSelection
}

export interface HomeAccessVariableInputSelection {
  templateVariableId?: boolean
  name?: boolean
  value?: boolean
  fresh?: boolean
}

export interface HomeAmenityInputSelection {
  homeId?: boolean
  amenityId?: boolean
  quantity?: boolean
  comment?: boolean
}

export interface HomeBookSectionInputSelection {
  homeId?: boolean
  bookKind?: boolean
  key?: boolean
  active?: boolean
  text?: boolean
}

export interface HomeBooksMutationsSelection {
  createSection?: {
    __args: { kind: BookKind; title: string; listOrder?: number }
  } & BookSectionSelection
  deleteSection?: { __args: { kind: BookKind; key: string } }
  updateSection?: { __args: { input: BookSectionUpdateInput } }
  updateSectionDefaultValue?: {
    __args: { kind: BookKind; key: string; value: string }
  }
  updateSections?: { __args: { sections: BookSectionUpdateInput[] } }
  bindSections?: { __args: { sections: HomeBookSectionInput[] } }
}

export interface HomeComplianceInformationInputSelection {
  homeId?: boolean
  jurisdictionId?: boolean
  permitStatus?: boolean
  leaseStatus?: boolean
  rent?: boolean
  nextRentIncrease?: boolean
  rofr?: boolean
  totalControlLength?: boolean
  fullyExecutedDate?: boolean
  termCommencementDate?: boolean
  timeBetweenFeTermCommencement?: boolean
  onboardingTime?: boolean
  endOfCurrentTerm?: boolean
  term?: boolean
  renewalOption?: boolean
  remainingOptions?: boolean
  sendRenewalNotificationLastDate?: boolean
  renewalRate?: boolean
  constructionPermit?: boolean
  inspectionRequiredForAdditionalBedrooms?: boolean
  strPermitNumber?: boolean
  firstRenewalActionNeeded?: boolean
  activePassiveActionRequired?: boolean
  strPermitExpiryDate?: boolean
  totPermitNumber?: boolean
  businessLicenseNumber?: boolean
  businessLicenseExpiryDate?: boolean
  twctmd?: boolean
  comment?: boolean
}

export interface HomeCustomFieldInputSelection {
  customFieldId?: boolean
  value?: boolean
}

export interface HomeLeaseInputSelection {
  homeId?: boolean
  startDate?: boolean
  endDate?: boolean
  amount?: boolean
  notes?: boolean
  signDate?: boolean
}

export interface HomeMutationsSelection {
  saveHomePerformanceMetrics?: {
    __args: { homePerformanceMetricsInput: HomePerformanceMetricInput[] }
  }
  saveHomeReviewRates?: { __args: { rates: HomeReviewRateInput[] } }
  saveHomeNoiseReadings?: { __args: { homeReadings: HomeNoiseReadingInput[] } }
  saveHomeOccupancyReadings?: {
    __args: { homeReadings: HomeOccupancyReadingInput[] }
  }
  addHomeAmenities?: { __args: { homeAmenities: HomeAmenityInput[] } }
  updateHomeAmenities?: { __args: { homeAmenities: HomeAmenityInput[] } }
  deleteHomeAmenities?: { __args: { homeAmenities: HomeAmenityInput[] } }
}

export interface HomeNoiseReadingInputSelection {
  homeId?: boolean
  readings?: NoiseReadingInputSelection
}

export interface HomeOccupancyReadingInputSelection {
  homeId?: boolean
  devices?: boolean
  status?: boolean
  threshold?: boolean
  readAt?: boolean
  zoneLocation?: boolean
  isUnderAlert?: boolean
}

export interface HomePerformanceMetricInputSelection {
  externalHomeId?: boolean
  externalHomeTitle?: boolean
  date?: boolean
  source?: boolean
  firstPageImpressions?: boolean
  firstPageImpressionsMkt?: boolean
  firstPageClicks?: boolean
  firstPageCtr?: boolean
  pageViews?: boolean
  pageViewsMkt?: boolean
  contactRate?: boolean
  bookRate?: boolean
  occupancyRate?: boolean
  occupancyRateMarket?: boolean
  occupancyRateYoy?: boolean
  nightsBooked?: boolean
  averageNightlyPrice?: boolean
  averageNightlyPriceMarket?: boolean
  averageNightlyPriceTop25?: boolean
  averageNightlyPriceBottom25?: boolean
  revpar?: boolean
  revparMarket?: boolean
  revparYoy?: boolean
  revparMom?: boolean
}

export interface HomeReviewRateInputSelection {
  externalHomeId?: boolean
  externalHomeTitle?: boolean
  date?: boolean
  source?: boolean
  ratingStars?: RatingStarsInputSelection
}

export interface HomeSharedAccessInstructionInputSelection {
  homeId?: boolean
  sharedAccessInstructionId?: boolean
  listOrder?: boolean
}

export interface InquirySelection {
  id?: boolean
  receivedAt?: boolean
  email?: boolean
  phone?: boolean
  guestName?: boolean
  guestUniqueId?: boolean
  messageId?: boolean
  message?: boolean
  startDate?: boolean
  endDate?: boolean
  isResponse?: boolean
  externalHomeId?: boolean
  source?: boolean
}

export interface InquiryActionInputSelection {
  label?: boolean
  link?: boolean
}

export interface InquiryInputSelection {
  receivedAt?: boolean
  email?: boolean
  guestName?: boolean
  guestPhone?: boolean
  guestUniqueId?: boolean
  messageId?: boolean
  message?: boolean
  startDate?: boolean
  endDate?: boolean
  isResponse?: boolean
  externalPropertyId?: boolean
  externalPropertyName?: boolean
  source?: boolean
  actions?: InquiryActionInputSelection
}

export interface MutationSelection {
  templateVariables?: { __args: { ids: string[] } } & TemplateVariableSelection
  updateAllBlocks?: { __args: { filter?: BookingUpdateFilter } }
  updateAllBookings?: { __args: { filter?: BookingUpdateFilter } }
  updateCutsheets?: boolean
  updateCutsheetsPart2?: boolean
  republishEvent?: { __args: { eventIds: UUID[] } }
  publicToken?: { __args: { email?: string; phone?: string } }
  createAsset?: {
    __args: { assetRequest: AssetRequest }
  } & AssetUploadInfoSelection
  compliance?: ComplianceMutationsSelection
  home?: HomeMutationsSelection
  experience?: ExperienceMutationsSelection
  createHomeImage?: {
    __args: {
      homeId: UUID
      extension: string
      size?: number
      fileName?: string
    }
  } & AssetUploadInfoSelection
  updateBlockedPeriod?: { __args: { id?: UUID; input: BlockedPeriodInput } }
  deactivateHome?: { __args: { homeId: UUID } }
  offBoardHome?: { __args: { homeId: UUID } }
  updateHome?: {
    __args: {
      homeId: UUID
      title: string
      shortDescription: string
      listed: boolean
      customFields: HomeCustomFieldInput[]
    }
  }
  updateHomeParentId?: { __args: { homeId: UUID; parentId?: UUID } }
  addBuyouts?: { __args: { homeId: UUID; buyoutIds: UUID[] } }
  deleteBuyouts?: { __args: { homeId: UUID; buyoutIds: UUID[] } }
  recursiveDeleteBuyouts?: { __args: { buyoutId: UUID } }
  updateHomeRooms?: {
    __args: { homeId: UUID; rooms: RoomUpdate[] }
  } & RoomSelection
  removeHomeRoom?: { __args: { homeId: UUID; roomId: UUID } }
  removeHomeParentId?: { __args: { homeId: UUID } }
  updateOnBoardingStage?: {
    __args: { homeId: UUID; onBoardingStage: OnBoardingStage }
  }
  updateHomeLease?: {
    __args: { leaseId?: UUID; lease: HomeLeaseInput }
  } & HomeLeaseSelection
  updateRiskLevel?: { __args: { homeId: UUID; riskLevel: RiskLevel } }
  updateHomeLivePeriod?: {
    __args: { homeId: UUID; liveSince?: IDate; liveUntil?: IDate }
  }
  fetchRingRecordingLink?: { __args: { eventId: UUID } }
  sharedAccessInstructions?: SharedAccessInstructionsMutationsSelection
  homeAccessInstructions?: HomeAccessInstructionsMutationsSelection
  createAmenity?: {
    __args: { groupId: UUID; name: string; scope: AmenityScope }
  } & AmenitySelection
  updateAmenityName?: { __args: { amenityId: UUID; name: string } }
  deleteAmenity?: { __args: { amenityId: UUID } }
  homeBooks?: HomeBooksMutationsSelection
  changeUnderwrittenRevenue?: {
    __args: { homeId: UUID; input: ProjectedRevenueInput[] }
  }
  changeProjectedRevenue?: {
    __args: { homeId: UUID; input: ProjectedRevenueInput[] }
  }
  booking?: BookingMutationsSelection
  updateBooking?: { __args: { confirmationIds: number[] } } & BookingSelection
  resendMessage?: {
    __args: { personNotifyLogId: UUID; phones?: string[]; emails?: string[] }
  }
  addBookingInquiry?: { __args: { inquiry: InquiryInput } } & InquirySelection
  addBookingConfirmation?: {
    __args: { confirmation: ExternalBookingConfirmationInput }
  } & ExternalBookingConfirmationSelection
  addBookingCodes?: {
    __args: {
      confirmationId: number
      variables: BookingCodeVariable[]
      instructions: BookingCodeTemplate[]
    }
  }
  requestBookingReport?: {
    __args: { from: IDate; to: IDate; sorting: BookingSorting }
  }
  requestReviewsReport?: { __args: { from: IDate; to: IDate } }
  updateBookingCustomFieldValues?: {
    __args: { bookingId: UUID; fieldValues: CustomFieldValueUpdateInput[] }
  }
  resendCheckInInstructions?: {
    __args: { bookingId: UUID; force?: boolean; email?: string }
  }
  saveWifiRegistration?: { __args: { input: WifiRegistrationInput } }
  resendDocumentRequest?: { __args: { bookingId: UUID } }
  createBookingQuote?: {
    __args: { bookingRequest: BookingQuoteRequest }
  } & BookingQuoteSelection
  createMarriottBooking?: {
    __args: { bookingRequest: BookingRequest; contact: NewContactDetails }
  }
  requestContact?: { __args: { request: ContactRequestInput } }
  requestPartnership?: { __args: { request: PartnershipRequestInput } }
  requestRetreatProposal?: { __args: { content: string } }
  updateCustomFieldSections?: {
    __args: { sections: CustomFieldSectionInput[] }
  } & ExtendedCustomFieldSectionSelection
  updateCustomFields?: {
    __args: { customFields: CustomFieldInput[] }
  } & ExtendedCustomFieldSelection
  createCoupon?: {
    __args: {
      code: string
      description?: string
      salesFrom?: IDate
      salesTo?: IDate
      bookingPeriod: CouponBookingPeriodType
      bookingFrom: IDate
      bookingTo: IDate
      applicableTo: CouponHomeApplicableTo
      kind: CouponKind
      properties?: UUID[]
      availableForHighSeason?: boolean
      maximumUsages?: number
      minimumPrice?: number
      discountType: DiscountKind
      discountValue: number
    }
  }
  updateStreamlineCoupons?: boolean
  enableCoupon?: { __args: { code: string } }
  disableCoupon?: { __args: { code: string } }
  updateCoupon?: { __args: { input: CouponUpdateInput; newCode?: string } }
  updateStreamlineCoupon?: { __args: { input: StreamlineCoupon } }
  backOfficeUser?: BackOfficeUserMutationsSelection
  addToBlacklist?: { __args: { email: string } }
  addCreditCardToBlacklist?: { __args: { number: string } }
  removeCreditCardFromBlacklist?: { __args: { number: string } }
  deleteFromBlacklist?: { __args: { email: string } }
}

export interface NewContactDetailsSelection {
  fullName?: boolean
  email?: boolean
  phone?: boolean
}

export interface NoiseReadingInputSelection {
  zoneName?: boolean
  status?: boolean
  noiseLevel?: boolean
  threshold?: boolean
  readAt?: boolean
  zoneLocation?: boolean
  isUnderAlert?: boolean
}

export interface PartnershipRequestInputSelection {
  name?: boolean
  email?: boolean
  phone?: boolean
  city?: boolean
  message?: boolean
}

export interface ProjectedRevenueInputSelection {
  period?: DateRangeInputSelection
  value?: boolean
}

export interface RatingStarsInputSelection {
  category?: boolean
  rates1Stars?: boolean
  rates2Stars?: boolean
  rates3Stars?: boolean
  rates4Stars?: boolean
  rates5Stars?: boolean
}

export interface ReviewInputSelection {
  messageId?: boolean
  response?: boolean
  privateFeedback?: boolean
  source?: boolean
  booking?: BookingInfoInputSelection
  categoryReviews?: CategoryReviewInputSelection
}

export interface RoleInputSelection {
  roleId?: boolean
  name?: boolean
  privileges?: boolean
}

export interface RoomUpdateSelection {
  roomId?: boolean
  name?: boolean
  description?: boolean
  kind?: boolean
  maxOccupancy?: boolean
  area?: boolean
  bathroomKind?: boolean
  images?: boolean
  sleepingPlaces?: AmenityInfoSelection
  roomAmenities?: AmenityInfoSelection
  bathroomAmenities?: AmenityInfoSelection
}

export interface SharedAccessInstructionInputSelection {
  title?: boolean
  displayTitle?: boolean
  template?: boolean
  variables?: boolean
}

export interface SharedAccessInstructionsMutationsSelection {
  upsertInstructions?: {
    __args: {
      variables: SharedAccessVariableInput[]
      instructions: SharedAccessInstructionInput[]
    }
  } & AccessProjectionSelection
}

export interface SharedAccessVariableInputSelection {
  templateVariableId?: boolean
  name?: boolean
  global?: boolean
  value?: boolean
  fresh?: boolean
}

export interface StreamlineCouponSelection {
  streamlineId?: boolean
  id?: boolean
  name?: boolean
}

export interface WifiRegistrationInputSelection {
  homeId?: boolean
  name?: boolean
  email?: boolean
  gender?: boolean
  birthYear?: boolean
  userOs?: boolean
  url?: boolean
}

export interface ADRSelection {
  period?: boolean
  weekdays?: boolean
  weekends?: boolean
}

export interface AccessInstructionProjectionSelection {
  id?: boolean
  homeId?: boolean
  title?: boolean
  displayTitle?: boolean
  template?: boolean
  listOrder?: boolean
  isShared?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface AccessVariableProjectionSelection {
  templateVariableId?: boolean
  name?: boolean
  homeId?: boolean
  global?: boolean
  value?: boolean
  isShared?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface AddressSelection {
  address?: boolean
  zipCode?: boolean
  city?: boolean
  stateId?: boolean
  countryCode?: boolean
  regionId?: boolean
  state?: StateSelection
  region?: RegionSelection
}

export interface AirBnbHomeRatingsSelection {
  overall?: ReviewRateSelection
  accuracy?: ReviewRateSelection
  checkIn?: ReviewRateSelection
  communication?: ReviewRateSelection
  cleanliness?: ReviewRateSelection
  location?: ReviewRateSelection
  value?: ReviewRateSelection
}

export interface AmenitySelection {
  id?: boolean
  amenityGroupId?: boolean
  active?: boolean
  name?: boolean
  scope?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface AmenityProjectionSelection {
  id?: boolean
  name?: boolean
  amenityGroupId?: boolean
  amenityGroupName?: boolean
  scope?: boolean
}

export interface AssetSelection {
  id?: boolean
  context?: boolean
  s3Bucket?: boolean
  s3Key?: boolean
  public?: boolean
  targetId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  extension?: boolean
  size?: boolean
  fileName?: boolean
  url?: boolean
}

export interface AttachmentViewSelection {
  name?: boolean
  url?: boolean
}

export interface AvailableRevenueSelection {
  date?: boolean
  value?: boolean
}

export interface BackOfficeRoleSelection {
  id?: boolean
  name?: boolean
  privileges?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface BackOfficeUserSelection {
  email?: boolean
  name?: boolean
  privileges?: boolean
  active?: boolean
  lastAccessAt?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  roles?: BackOfficeRoleSelection
}

export interface BathroomSelection {
  id?: boolean
  homeId?: boolean
  listOrder?: boolean
  name?: boolean
  kind?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  amenities?: BathroomAmenitySelection
}

export interface BathroomAmenitySelection {
  bathroomId?: boolean
  amenityId?: boolean
  name?: boolean
}

export interface BenchmarkSelection {
  id?: boolean
  data?: DataSelection
}

export interface BlacklistedCreditCardSelection {
  number?: boolean
}

export interface BlacklistedCreditCardResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: BlacklistedCreditCardSelection
}

export interface BlacklistedEmailSelection {
  email?: boolean
}

export interface BlacklistedEmailResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: BlacklistedEmailSelection
}

export interface BlockedPeriodSelection {
  id?: boolean
  homeId?: boolean
  period?: DateRangeSelection
  reason?: boolean
  source?: boolean
  sourceId?: boolean
  occupancyStatus?: boolean
}

export interface BookSectionSelection {
  bookKind?: boolean
  key?: boolean
  listOrder?: boolean
  title?: boolean
  defaultValue?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  propertiesUsing?: boolean
  region?: RegionSelection
}

export interface BookingSelection {
  id?: boolean
  hash?: boolean
  source?: boolean
  userId?: boolean
  guestName?: boolean
  emails?: boolean
  phones?: boolean
  address?: AddressSelection
  guestId?: boolean
  homeId?: boolean
  couponCode?: boolean
  period?: DateRangeSelection
  guests?: boolean
  pets?: boolean
  status?: boolean
  notes?: boolean
  heardAboutUs?: boolean
  additionalData?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  confirmationId?: boolean
  reservationId?: boolean
  aboutUsDetails?: boolean
  paymentDetails?: BookingPaymentDetailsSelection
  home?: HomeSelection
  wifiRegistrations?: WifiRegistrationSelection
  guestList?: PersonSelection
  checkIn?: boolean
  checkOut?: boolean
  changeRequests?: BookingChangeRequestSelection
  appDownloads?: boolean
  guestsWhoDownloaded?: PersonSelection
  reviews?: ReviewSelection
  tier?: boolean
  attachments?: AttachmentViewSelection
  customFields?: CustomFieldSectionProjectionSelection
  messagesSent?: {
    __args: {
      templateKind: TemplateKind
      status: PersonNotifyLogStatus
      query?: string
      sortOrder: SortOrder
    }
  } & PersonNotifyLogSelection
  lockCode?: BookingLockCodeSelection
  externalLinks?: BookingExternalLinksSelection
  links?: BookingLinksSelection
}

export interface BookingChangeRequestSelection {
  id?: boolean
  bookingId?: boolean
  oldDate?: boolean
  newDate?: boolean
  personId?: boolean
  kind?: boolean
  status?: boolean
  reviewedAt?: boolean
  reviewedBy?: boolean
  reprovedReason?: boolean
  slackNotificationTs?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface BookingExternalLinksSelection {
  streamline?: boolean
  bookingConfirmation?: boolean
  checkInInstructions?: boolean
  webManual?: boolean
}

export interface BookingFeeSelection {
  name?: boolean
  feeKind?: boolean
  amount?: boolean
}

export interface BookingLinksSelection {
  streamline?: boolean
  checkInInstructions?: boolean
  manual?: boolean
  frontapp?: boolean
}

export interface BookingLockCodeSelection {
  bookingId?: boolean
  lockTypeId?: boolean
  code?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface BookingPaymentDetailsSelection {
  taxesAndFees?: BookingFeeSelection
  rates?: BookingRateSelection
  transactions?: BookingTransactionSelection
  isPaid?: boolean
  totalPaid?: boolean
  totalPrice?: boolean
  balance?: boolean
}

export interface BookingQuoteSelection {
  id?: boolean
  guests?: boolean
  pets?: boolean
  checkIn?: boolean
  checkOut?: boolean
  salesFrom?: boolean
  salesTo?: boolean
  createdAt?: boolean
  homeQuote?: BookingQuoteCouponSelection
  guest?: PersonSelection
  user?: UserSelection
  notifyLog?: PersonNotifyLogSelection
}

export interface BookingQuoteCouponSelection {
  plainPrice?: boolean
  quotePrice?: boolean
  discount?: DiscountInputSelection
  coupon?: CouponSelection
}

export interface BookingQuoteResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: BookingQuoteSelection
}

export interface BookingRateSelection {
  season?: boolean
  date?: boolean
  price?: boolean
  extra?: boolean
  discount?: boolean
  grossPrice?: boolean
}

export interface BookingResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: BookingSelection
}

export interface BookingTransactionSelection {
  id?: boolean
  date?: boolean
  transactionKind?: boolean
  processedBy?: boolean
  creditCardType?: boolean
  creditCardNumber?: boolean
  creditCardExpiration?: boolean
  amount?: boolean
  createdAt?: boolean
}

export interface BookingVolumeLeadTimeSelection {
  createdAt?: boolean
  leadTimeFrom?: boolean
  leadTimeUntil?: boolean
  amount?: boolean
}

export interface BookingWithIssuesSelection {
  booking?: BookingSelection
  issues?: boolean
}

export interface CategorySelection {
  id?: boolean
  name?: boolean
}

export interface CategoryReviewSelection {
  category?: boolean
  rating?: boolean
  comment?: boolean
}

export interface ChannelDistributionSelection {
  channelName?: boolean
  percentage?: boolean
  total?: boolean
}

export interface ComplianceQueriesSelection {
  jurisdictions?: JurisdictionSelection
}

export interface ConfigurationStatusSelection {
  strPermit?: boolean
  galleryPicturesCount?: boolean
  lockType?: boolean
  fallbackCode?: boolean
  accessInstructions?: boolean
  manualSections?: boolean
  rooms?: HomeConfigRoomsAuditSelection
  pricing?: boolean
  occupancySensors?: boolean
  noiseSensors?: HomeNoiseSensorStatusSelection
  ringDevices?: boolean
}

export interface ConversationContextSelection {
  contact?: PersonSelection
  currentBooking?: BookingSelection
  allBookings?: BookingSelection
  inquiries?: JaimitoInquirySelection
}

export interface CouponSelection {
  code?: boolean
  streamlineCouponId?: boolean
  description?: boolean
  isActive?: boolean
  salesFrom?: boolean
  salesTo?: boolean
  bookingPeriodType?: boolean
  bookingFrom?: boolean
  bookingTo?: boolean
  applicableTo?: boolean
  availableForHighSeason?: boolean
  maximumUsages?: boolean
  minimumPrice?: boolean
  discountType?: boolean
  discountValue?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  usageCount?: boolean
  homes?: HomeSelection
  usages?: boolean
  isValidFor?: { __args: { checkIn: IDate; checkOut: IDate; homeId?: UUID } }
  validForHomes?: { __args: { checkIn: IDate; checkOut: IDate } }
}

export interface CouponCountersSelection {
  active?: boolean
  inactive?: boolean
  expired?: boolean
  total?: boolean
}

export interface CouponProjectionResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: CouponSelection
}

export interface CustomFieldProjectionSelection {
  id?: boolean
  kind?: boolean
  name?: boolean
  listOrder?: boolean
  value?: boolean
  valueIsDefault?: boolean
  options?: boolean
  internal?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  assets?: AssetSelection
}

export interface CustomFieldSectionProjectionSelection {
  section?: ExtendedCustomFieldSectionSelection
  fields?: CustomFieldProjectionSelection
}

export interface CustomFieldValueSelection {
  value?: boolean
  listOrder?: boolean
}

export interface CustomerExperienceIndicatorsSelection {
  nps?: boolean
  airbnbSuperhostRating?: boolean
  lastAirbnbSuperhostRatingUpdated?: boolean
  airbnbSuperhostPeriod?: DateRangeSelection
  airbnbFiveStarReviewsToSuperhost?: boolean
  totalNumberOfPainBookings?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  newReviews?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  painBookings?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  reviewsConversion?: { __args: { from: IDate; to: IDate } }
  painReservationPercent?: { __args: { from: IDate; to: IDate } }
  avgRating?: { __args: { from: IDate; to: IDate } }
  positiveReviews?: { __args: { from: IDate; to: IDate } }
}

export interface DataSelection {
  month?: boolean
  current?: boolean
  past?: boolean
  projected?: boolean
}

export interface DateRangeSelection {
  start?: boolean
  end?: boolean
}

export interface DateRangeInputSelection {
  start?: boolean
  end?: boolean
}

export interface DayCountSelection {
  date?: boolean
  count?: boolean
}

export interface DayEntrySelection {
  date?: boolean
  occupied?: boolean
  inactive?: boolean
}

export interface DiscountInputSelection {
  discountKind?: boolean
  discountAmount?: boolean
}

export interface EventProjectionSelection {
  eventId?: boolean
  eventDate?: boolean
  tags?: boolean
  kind?: boolean
  data?: boolean
  sourceKind?: boolean
  source?: boolean
}

export interface ExperienceSelection {
  id?: boolean
  title?: boolean
  kind?: boolean
  regionId?: boolean
  period?: DateRangeSelection
  markdown?: boolean
  longitude?: boolean
  latitude?: boolean
  listOrder?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  image?: AssetSelection
}

export interface ExperienceResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: ExperienceSelection
}

export interface ExtendedCustomFieldSelection {
  id?: boolean
  name?: boolean
  customFieldSectionId?: boolean
  kind?: boolean
  listOrder?: boolean
  defaultValue?: boolean
  multipleValues?: boolean
  enabled?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  values?: CustomFieldValueSelection
  assets?: AssetSelection
}

export interface ExtendedCustomFieldSectionSelection {
  id?: boolean
  name?: boolean
  scope?: boolean
  listOrder?: boolean
  readOnly?: boolean
  kind?: boolean
  enabled?: boolean
  customFields?: ExtendedCustomFieldSelection
}

export interface FinanceIndicatorsSelection {
  strLtrCoefficient?: { __args: { from: IDate; to: IDate } }
  discounts?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  averageDiscount?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  securityDeposits?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  petDeposits?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  outstandingPayments?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  bookingVolume?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  bookingVolumePerProperty?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  bookingVolumePerCheckInPeriod?: {
    __args: {
      createdAtFrom: IDate
      createdAtUntil: IDate
      leadTimeFrom: number
      leadTimeUntil: number
    }
  } & BookingVolumeLeadTimeSelection
  realizedRevenue?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  realizedRevenuePerProperty?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  futureRevenue?: {
    __args: { from: IDate; to: IDate }
  } & FutureRevenueSelection
  projectedRevenue?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  projectedRevenuePerProperty?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  underwrittenRevenue?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  availableRevenue?: {
    __args: { from: IDate; to: IDate }
  } & AvailableRevenueSelection
  adr?: { __args: { from: IDate; to: IDate } } & ADRSelection
  revpau?: { __args: { from: IDate; to: IDate } } & RevPAUSelection
}

export interface FutureRevenueSelection {
  date?: boolean
  projected?: boolean
  booked?: boolean
  paid?: boolean
}

export interface HomeSelection {
  id?: boolean
  name?: boolean
  title?: boolean
  description?: boolean
  shortDescription?: boolean
  keywords?: boolean
  maxAdults?: boolean
  maxOccupancy?: boolean
  maxPets?: boolean
  area?: boolean
  latitude?: boolean
  longitude?: boolean
  couponsAllowed?: boolean
  longTermAllowed?: boolean
  shortTermAllowed?: boolean
  active?: boolean
  virtual?: boolean
  listed?: boolean
  address?: AddressSelection
  normalizedName?: boolean
  roomsCount?: boolean
  bathroomsCount?: boolean
  bedsCount?: boolean
  floorsCount?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  hash?: boolean
  calendar?: { __args: { from: IDate; to: IDate } } & HomeDateStatusSelection
  sensorStatuses?: boolean
  thermostats?: ThermostatDeviceSelection
  liveStatus?: boolean
  details?: HomeDetailsSelection
  parent?: HomeSelection
  children?: HomeSelection
  thumbnail?: AssetSelection
  links?: HomeLinksSelection
  region?: RegionSelection
  reviews?: {
    __args: {
      source: LeadSource
      overallMinRating?: number
      overallMaxRating?: number
      pagination?: PaginationInput
    }
  } & ReviewResultsPageSelection
  homeAmenities?: HomeAmenitySelection
  rooms?: RoomSelection
  liveNoiseLevel?: HomeNoiseReadingSelection
  liveOccupancy?: HomeOccupancyReadingSelection
  leases?: HomeLeaseSelection
  compliances?: HomeComplianceInformationSelection
  activeLeaseMonthlyAmount?: boolean
  bathrooms?: BathroomSelection
  images?: AssetSelection
  ratings?: HomeReviewRatingsViewSelection
  notes?: HomeNotesSelection
  airdnaLtmRentalizer?: RentalizerLtmViewSelection
  customFields?: CustomFieldSectionProjectionSelection
  bookings?: {
    __args: {
      from?: IDate
      to?: IDate
      riskLevel: RiskLevel
      leadSource: LeadSource
      pagination?: PaginationInput
      sortBy: BookingSorting
      sortOrder: SortOrder
    }
  } & BookingResultsPageSelection
  ongoingBooking?: BookingSelection
  book?: { __args: { kind: BookKind } } & HomeBookSelection
  tags?: TagSelection
  maintenanceStatus?: boolean
  indicators?: {
    __args: { granularity: Granularity }
  } & HomeIndicatorsSelection
  upcomingWeekendsOccupancy?: {
    __args: { quantity: number }
  } & DayEntrySelection
  inquiriesByDay?: { __args: { from: IDate; to: IDate } } & DayCountSelection
  inquiriesCount?: { __args: { from: IDate; to: IDate } }
  upcomingWeekendsRelativeOccupancy?: { __args: { quantity?: number } }
  projectedRevenues?: {
    __args: { from?: IDate; to?: IDate }
  } & ProjectedRevenueSelection
  ringDevices?: RingDeviceSelection
  ringDevicesHistory?: {
    __args: { pagination?: PaginationInput }
  } & RingEventResultsPageSelection
  sourceListed?: HomeSourceListedViewSelection
  configurationStatus?: ConfigurationStatusSelection
  pricingHistory?: {
    __args: { pagination?: PaginationInput }
  } & PricingHistoryProjectionResultsPageSelection
  channels?: HomeListingSelection
  blockedHomes?: HomeSelection
  accessVariables?: AccessVariableProjectionSelection
  accessInstructions?: AccessInstructionProjectionSelection
}

export interface HomeAmenitySelection {
  homeId?: boolean
  amenityId?: boolean
  quantity?: boolean
  comment?: boolean
}

export interface HomeAwayHomeRatingsSelection {
  overall?: ReviewRateSelection
}

export interface HomeBookSelection {
  sections?: HomeBookSectionSelection
}

export interface HomeBookSectionSelection {
  homeId?: boolean
  bookKind?: boolean
  key?: boolean
  title?: boolean
  listOrder?: boolean
  active?: boolean
  defaultValue?: boolean
  value?: boolean
}

export interface HomeComplianceInformationSelection {
  permitStatus?: boolean
  leaseStatus?: boolean
  rent?: boolean
  nextRentIncrease?: boolean
  rofr?: boolean
  totalControlLength?: boolean
  fullyExecutedDate?: boolean
  termCommencementDate?: boolean
  timeBetweenFeTermCommencement?: boolean
  onboardingTime?: boolean
  endOfCurrentTerm?: boolean
  term?: boolean
  renewalOption?: boolean
  remainingOptions?: boolean
  sendRenewalNotificationLastDate?: boolean
  renewalRate?: boolean
  constructionPermit?: boolean
  inspectionRequiredForAdditionalBedrooms?: boolean
  strPermitNumber?: boolean
  firstRenewalActionNeeded?: boolean
  activePassiveActionRequired?: boolean
  strPermitExpiryDate?: boolean
  totPermitNumber?: boolean
  businessLicenseNumber?: boolean
  businessLicenseExpiryDate?: boolean
  twctmd?: boolean
  comment?: boolean
  jurisdiction?: JurisdictionSelection
}

export interface HomeConfigRoomsAuditSelection {
  total?: boolean
  configured?: boolean
}

export interface HomeDateStatusSelection {
  date?: boolean
  minStay?: boolean
  season?: boolean
  rate?: boolean
  status?: boolean
}

export interface HomeDetailsSelection {
  liveSince?: boolean
  liveUntil?: boolean
  maintenanceStatus?: boolean
  onBoardingStage?: boolean
  riskLevel?: boolean
  riskReasoning?: boolean
  publishHighRisk?: boolean
  lockTypeId?: boolean
  additionalData?: boolean
  wheelchairAccessible?: boolean
  onBoardingStatus?: boolean
}

export interface HomeFinanceIndicatorsSelection {
  health?: { __args: { from: IDate; to: IDate } }
  strLtrCoefficient?: { __args: { from: IDate; to: IDate } }
  discounts?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  averageDiscount?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  securityDeposits?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  petDeposits?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  outstandingPayments?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  bookingVolume?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  bookingVolumePerCheckInPeriod?: {
    __args: {
      createdAtFrom: IDate
      createdAtUntil: IDate
      leadTimeFrom: number
      leadTimeUntil: number
    }
  } & BookingVolumeLeadTimeSelection
  realizedRevenue?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  futureRevenue?: {
    __args: { from: IDate; to: IDate }
  } & FutureRevenueSelection
  projectedRevenue?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  underwrittenRevenue?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  availableRevenue?: {
    __args: { from: IDate; to: IDate }
  } & AvailableRevenueSelection
  adr?: { __args: { from: IDate; to: IDate } } & ADRSelection
  revpau?: { __args: { from: IDate; to: IDate } } & RevPAUSelection
}

export interface HomeIndicatorsSelection {
  finance?: HomeFinanceIndicatorsSelection
  sales?: SalesIndicatorsSelection
  customerExperience?: CustomerExperienceIndicatorsSelection
  operations?: OperationsIndicatorsSelection
}

export interface HomeLeadSourceIdInputSelection {
  source?: boolean
  externalHomeId?: boolean
}

export interface HomeLeaseSelection {
  id?: boolean
  homeId?: boolean
  startDate?: boolean
  endDate?: boolean
  amount?: boolean
  notes?: boolean
  signDate?: boolean
}

export interface HomeLinksSelection {
  streamline?: boolean
  listings?: ListingLinkSelection
  manual?: boolean
}

export interface HomeListingSelection {
  homeId?: boolean
  source?: boolean
  title?: boolean
  properties?: boolean
  active?: boolean
  externalHomeId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface HomeNoiseReadingSelection {
  zoneName?: boolean
  status?: boolean
  noiseLevel?: boolean
  threshold?: boolean
  underAlert?: boolean
  zoneLocation?: boolean
  readAt?: boolean
}

export interface HomeNoiseSensorStatusSelection {
  online?: boolean
  total?: boolean
}

export interface HomeNotesSelection {
  id?: boolean
  homeId?: boolean
  message?: boolean
  agentId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

export interface HomeOccupancyReadingSelection {
  status?: boolean
  devices?: boolean
  threshold?: boolean
  underAlert?: boolean
  zoneLocation?: boolean
  readAt?: boolean
}

export interface HomeResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: HomeSelection
}

export interface HomeReviewRatingsViewSelection {
  airBnb?: AirBnbHomeRatingsSelection
  homeAway?: HomeAwayHomeRatingsSelection
}

export interface HomeSourceListedCounterViewSelection {
  website?: boolean
  airBnb?: boolean
  homeAway?: boolean
}

export interface HomeSourceListedViewSelection {
  website?: boolean
  airBnb?: boolean
  homeAway?: boolean
}

export interface HomesCountingViewSelection {
  homes?: boolean
  listings?: boolean
  preLiveTotal?: boolean
  preOnBoarding?: boolean
  onBoarding?: boolean
  bookable?: boolean
  live?: boolean
  new?: boolean
  stabilized?: boolean
  unknown?: boolean
  liveTotal?: boolean
  newTotal?: boolean
}

export interface InboxQueriesSelection {
  conversationContext?: {
    __args: { conversationId: string }
  } & ConversationContextSelection
}

export interface IndicatorSelection {
  period?: DateRangeSelection
  granularity?: boolean
  aggregation?: boolean
  aggregatedValue?: boolean
  mostRecentValue?: boolean
  annualizedValue?: boolean
  variation?: boolean
  values?: IndicatorEntrySelection
}

export interface IndicatorEntrySelection {
  date?: boolean
  value?: boolean
}

export interface IndicatorsSelection {
  finance?: FinanceIndicatorsSelection
  sales?: SalesIndicatorsSelection
  customerExperience?: CustomerExperienceIndicatorsSelection
  operations?: OperationsIndicatorsSelection
}

export interface InsightsFieldsSelection {
  gaAccessToken?: boolean
  firstAppLogins?: {
    __args: { from: IDate; to: IDate }
  } & MonthCountProjectionSelection
  bookingsCountByMonth?: {
    __args: { from: IDate; to: IDate }
  } & MonthCountProjectionSelection
  bookingsWithLoginsCountByMonth?: {
    __args: { from: IDate; to: IDate }
  } & MonthCountProjectionSelection
  occupancyVersusInquiriesPerHome?: {
    __args: {
      from: IDate
      to: IDate
      createdFrom?: IDate
      createdTo?: IDate
      onlyStabilized?: boolean
    }
  } & OccupancyInquiriesPerHomeProjectionSelection
  occupancyVersusInquiriesPerRegion?: {
    __args: {
      from: IDate
      to: IDate
      createdFrom?: IDate
      createdTo?: IDate
      onlyStabilized?: boolean
    }
  } & OccupancyInquiriesPerRegionProjectionSelection
}

export interface JaimitoInquirySelection {
  guestName?: boolean
  guestPhone?: boolean
  email?: boolean
  message?: boolean
  inquiryId?: boolean
  isResponse?: boolean
  startDate?: boolean
  endDate?: boolean
  source?: boolean
  receivedAt?: boolean
  home?: HomeSelection
}

export interface JurisdictionSelection {
  id?: boolean
  name?: boolean
}

export interface ListingLinkSelection {
  leadSource?: boolean
  url?: boolean
}

export interface LockTypeSelection {
  id?: boolean
  name?: boolean
  variables?: TemplateVariableSelection
}

export interface MonthCountProjectionSelection {
  date?: boolean
  count?: boolean
}

export interface OccupancyInquiriesPerHomeProjectionSelection {
  home?: HomeSelection
  data?: OccupancyInquiriesProjectionSelection
}

export interface OccupancyInquiriesPerRegionProjectionSelection {
  region?: RegionSelection
  numberOfHomes?: boolean
  data?: OccupancyInquiriesProjectionSelection
}

export interface OccupancyInquiriesProjectionSelection {
  startDate?: boolean
  endDate?: boolean
  occupancy?: boolean
  inquiries?: boolean
  inquiriesPerProperties?: boolean
  inquiriesPerAvailableProperties?: boolean
}

export interface OmniSearchResultsSelection {
  users?: UserSelection
  bookings?: BookingSelection
  homes?: HomeSelection
}

export interface OperationsIndicatorsSelection {
  checkIns?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  checkOuts?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  preStayInspections?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  postStayInspections?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  inspectionRate?: {
    __args: { from: IDate; to: IDate; inspectionKind: HomeInspectionKind }
  }
  openWorkOrders?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  closedWorkOrders?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
}

export interface PaginationSelection {
  page?: boolean
  size?: boolean
}

export interface PaginationInputSelection {
  page?: boolean
  size?: boolean
}

export interface PersonSelection {
  id?: boolean
  fullName?: boolean
  emails?: boolean
  phones?: boolean
  address?: AddressSelection
  createdAt?: boolean
  updatedAt?: boolean
  firstName?: boolean
  lastName?: boolean
  user?: UserSelection
}

export interface PersonNotifyLogSelection {
  id?: boolean
  personId?: boolean
  bookingId?: boolean
  subject?: boolean
  message?: boolean
  phones?: boolean
  emails?: boolean
  templateName?: boolean
  templateKind?: boolean
  status?: boolean
  additionalData?: boolean
  createdAt?: boolean
  person?: PersonSelection
  textMessage?: boolean
}

export interface PricingHistorySelection {
  homeId?: boolean
  rateType?: boolean
  author?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  prevAmount?: boolean
  newAmount?: boolean
  changeType?: boolean
  date?: boolean
  seasonAndDay?: SeasonAndDaySelection
  home?: HomeSelection
}

export interface PricingHistoryProjectionResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: PricingHistorySelection
}

export interface ProjectedRevenueSelection {
  id?: boolean
  homeId?: boolean
  period?: DateRangeSelection
  value?: boolean
}

export interface ProspectPartnerSelection {
  id?: boolean
  fullName?: boolean
  email?: boolean
  phone?: boolean
  address?: boolean
  bedrooms?: boolean
  bathrooms?: boolean
  accommodates?: boolean
  ltmRevenue?: boolean
  ltmRevenueLower?: boolean
  ltmRevenueUpper?: boolean
  ltmOccupancy?: boolean
  createdAt?: boolean
}

export interface QuerySelection {
  globalIndicators?: {
    __args: {
      region?: UUID
      liveStatus: OnBoardingStage
      assetType: AssetType
      granularity: Granularity
    }
  } & IndicatorsSelection
  insights?: InsightsFieldsSelection
  region?: { __args: { regionId: UUID } } & RegionFullSelection
  regions?: {
    __args: {
      onlyActive?: boolean
      featuredOnly?: boolean
      pagination?: PaginationInput
    }
  } & RegionResultsPageSelection
  compliance?: ComplianceQueriesSelection
  home?: {
    __args: {
      homeId?: UUID
      homePmsExternalId?: number
      leadSourceId?: HomeLeadSourceIdInput
    }
  } & HomeSelection
  homeByListing?: {
    __args: { source: LeadSource; externalId: number }
  } & HomeSelection
  homes?: {
    __args: {
      homeIds?: UUID[]
      regionId?: UUID
      name?: string
      onBoardingStatuses?: OnBoardingStage[]
      onlyActive?: boolean
      checkIn?: IDate
      checkOut?: IDate
      minPrice?: number
      maxPrice?: number
      minOccupancy?: number
      minPets?: number
      inHouseMonitoringStatuses?: InHouseMonitoringStatus[]
      sort: HomeQuerySorting
      pagination?: PaginationInput
    }
  } & HomeResultsPageSelection
  experiences?: {
    __args: {
      period?: DateRangeInput
      regionId?: UUID
      experienceKindName: ExperienceKindName
      pagination?: PaginationInput
    }
  } & ExperienceResultsPageSelection
  homesCounting?: { __args: { regionId?: UUID } } & HomesCountingViewSelection
  homesSourceListedCounting?: {
    __args: { regionId?: UUID }
  } & HomeSourceListedCounterViewSelection
  sharedAccessInstructions?: {
    __args: { terms?: string }
  } & SharedAccessInstructionSelection
  sharedAccessVariables?: AccessVariableProjectionSelection
  blockedPeriods?: BlockedPeriodSelection
  homeRoomAmenities?: RoomAmenitiesSelection
  homeFuzzySearch?: {
    __args: { name: string; onlyActive?: boolean; showVirtual?: boolean }
  } & HomeSelection
  pricingHistory?: {
    __args: { pagination?: PaginationInput }
  } & PricingHistoryProjectionResultsPageSelection
  pricingHistoryLink?: { __args: { pagination?: PaginationInput } }
  requestExportPricingDetails?: {
    __args: {
      period: DateRangeInput
      homeIds?: UUID[]
      regionId?: UUID
      onBoardingStatus: OnBoardingStatus[]
    }
  }
  requestExportPricingDetailsToEmail?: {
    __args: {
      period: DateRangeInput
      email: string
      homeIds?: UUID[]
      regionId?: UUID
      onBoardingStatus: OnBoardingStatus[]
    }
  }
  amenities?: { __args: { scope: AmenityScope } } & AmenityProjectionSelection
  blockedHomes?: { __args: { homeId: UUID } } & HomeSelection
  ancestors?: { __args: { homeId: UUID } }
  successors?: { __args: { homeId: UUID } }
  homeBook?: { __args: { homeId: UUID; kind: BookKind } } & HomeBookSelection
  bookSections?: { __args: { kind: BookKind } } & BookSectionSelection
  bookSectionsForRegion?: {
    __args: { kind: BookKind; regionId: UUID }
  } & BookSectionSelection
  bookSectionHistory?: {
    __args: { kind: BookKind; key: string; limit?: number }
  } & EventProjectionSelection
  homeBookSectionHistory?: {
    __args: { homeId: UUID; kind: BookKind; key: string; limit?: number }
  } & EventProjectionSelection
  occupancyBenchmarkByHomes?: {
    __args: { homeIds: UUID[]; dateRange: DateRangeInput }
  } & BenchmarkSelection
  occupancyBenchmarkByRegions?: {
    __args: { regionIds: UUID[]; dateRange: DateRangeInput }
  } & BenchmarkSelection
  realizedRevenueBenchmarkByHome?: {
    __args: { homeIds: UUID[]; dateRange: DateRangeInput }
  } & BenchmarkSelection
  realizedRevenueBenchmarkByRegion?: {
    __args: { regionIds: UUID[]; dateRange: DateRangeInput }
  } & BenchmarkSelection
  bookedRevenueBenchmarkByHome?: {
    __args: { homeIds: UUID[]; dateRange: DateRangeInput }
  } & BenchmarkSelection
  bookedRevenueBenchmarkByRegion?: {
    __args: { regionIds: UUID[]; dateRange: DateRangeInput }
  } & BenchmarkSelection
  lockTypes?: LockTypeSelection
  booking?: { __args: { bookingId: UUID } } & BookingSelection
  bookingQuotes?: {
    __args: {
      term?: string
      startDate?: IDate
      endDate?: IDate
      deliveredStatus: PersonNotifyLogStatus
      onlyBooked?: boolean
      pagination?: PaginationInput
    }
  } & BookingQuoteResultsPageSelection
  pendingBookingIssues?: {
    __args: { filter?: string; regionId?: UUID; issues?: BookingIssue[] }
  } & BookingWithIssuesSelection
  bookings?: {
    __args: {
      filter?: string
      from?: IDate
      to?: IDate
      regionId?: UUID
      homeId?: UUID
      riskLevel: RiskLevel
      leadSource: LeadSource
      pagination?: PaginationInput
      periodReference: BookingPeriodReference
      sortBy: BookingSorting
      sortOrder: SortOrder
      status?: BookingStatus[]
    }
  } & BookingResultsPageSelection
  bookingPersonNotifyLogs?: {
    __args: { bookingId?: UUID }
  } & PersonNotifyLogSelection
  personNotifyLogs?: {
    __args: { personNotifyLogId: UUID }
  } & PersonNotifyLogSelection
  reviews?: {
    __args: { source: LeadSource; pagination?: PaginationInput }
  } & ReviewResultsPageSelection
  configurationFields?: CustomFieldSectionProjectionSelection
  customFields?: {
    __args: { customFieldSectionId?: UUID }
  } & ExtendedCustomFieldSelection
  customFieldSections?: {
    __args: {
      scope: CustomFieldScope
      sectionId?: UUID
      readOnly?: boolean
      showDisabled?: boolean
    }
  } & ExtendedCustomFieldSectionSelection
  coupon?: { __args: { code: string } } & CouponSelection
  coupons?: {
    __args: {
      searchTerm?: string
      enabledOnly?: boolean
      validOnly?: boolean
      includeQuotes?: boolean
      sortBy: CouponSorting
      sortOrder: SortOrder
      pagination?: PaginationInput
    }
  } & CouponProjectionResultsPageSelection
  couponCounters?: CouponCountersSelection
  me?: BackOfficeUserSelection
  backOfficeUser?: { __args: { email: string } } & BackOfficeUserSelection
  backOfficeUsers?: {
    __args: { terms?: string; includeInactive?: boolean }
  } & BackOfficeUserSelection
  backOfficePrivileges?: boolean
  blacklistedCreditCards?: {
    __args: { pagination?: PaginationInput }
  } & BlacklistedCreditCardResultsPageSelection
  blacklistedEmails?: {
    __args: { pagination?: PaginationInput }
  } & BlacklistedEmailResultsPageSelection
  roles?: BackOfficeRoleSelection
  person?: { __args: { id: UUID } } & PersonSelection
  scheduledJobRuns?: {
    __args: { from?: IDate; to?: IDate }
  } & ScheduledJobRunSelection
  scheduledJobRun?: { __args: { id: UUID } } & ScheduledJobRunSelection
  prospectPartners?: ProspectPartnerSelection
  omniSearch?: { __args: { term: string } } & OmniSearchResultsSelection
  inbox?: InboxQueriesSelection
}

export interface RegionSelection {
  id?: boolean
  name?: boolean
  timezone?: boolean
  active?: boolean
  photoUrl?: boolean
  homeCount?: boolean
}

export interface RegionCustomerExperienceIndicatorsSelection {
  nps?: boolean
  lastAirbnbSuperhostRatingUpdated?: boolean
  totalNumberOfPainBookings?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  painBookings?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  reviewsConversion?: { __args: { from: IDate; to: IDate } }
  painReservationPercent?: { __args: { from: IDate; to: IDate } }
  avgRating?: { __args: { from: IDate; to: IDate } }
  positiveReviews?: { __args: { from: IDate; to: IDate } }
}

export interface RegionFinanceIndicatorsSelection {
  health?: { __args: { from: IDate; to: IDate } }
  strLtrCoefficient?: { __args: { from: IDate; to: IDate } }
  bookingVolume?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  bookingVolumePerProperty?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  realizedRevenue?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  realizedRevenuePerProperty?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  futureRevenue?: {
    __args: { from: IDate; to: IDate }
  } & FutureRevenueSelection
  projectedRevenue?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  projectedRevenuePerProperty?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
}

export interface RegionFullSelection {
  id?: boolean
  name?: boolean
  timezone?: boolean
  active?: boolean
  photoUrl?: boolean
  homeCount?: boolean
  upcomingWeekendsRelativeOccupancy?: { __args: { quantity?: number } }
  activeLeaseMonthlyAmount?: boolean
  activeLeaseMonthlyAmountPerProperty?: boolean
  ratings?: {
    __args: {
      from?: IDate
      to?: IDate
      onBoardingStatuses?: OnBoardingStatus[]
      riskLevels?: RiskLevel[]
    }
  } & HomeReviewRatingsViewSelection
  reviews?: {
    __args: {
      source: LeadSource
      overallMinRating?: number
      overallMaxRating?: number
      pagination?: PaginationInput
    }
  } & ReviewResultsPageSelection
  indicators?: {
    __args: {
      onBoardingStatus?: OnBoardingStatus[]
      assetType: AssetType
      granularity: Granularity
    }
  } & RegionIndicatorsSelection
}

export interface RegionIndicatorsSelection {
  finance?: RegionFinanceIndicatorsSelection
  sales?: RegionSalesIndicatorsSelection
  customerExperience?: RegionCustomerExperienceIndicatorsSelection
}

export interface RegionResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: RegionFullSelection
}

export interface RegionSalesIndicatorsSelection {
  occupancyRate?: {
    __args: { from: IDate; to: IDate; onlyStabilized?: boolean }
  } & IndicatorSelection
  weekendOccupancyRate?: {
    __args: { from: IDate; to: IDate; onlyStabilized?: boolean }
  } & IndicatorSelection
}

export interface RentalizerLtmViewSelection {
  averageDailyRate?: boolean
  occupancy?: boolean
  revenueMonthly?: boolean
}

export interface RevPAUSelection {
  period?: boolean
  weekdays?: boolean
  weekends?: boolean
}

export interface ReviewSelection {
  id?: boolean
  source?: boolean
  privateFeedback?: boolean
  response?: boolean
  bookingPeriod?: DateRangeSelection
  externalHomeId?: boolean
  externalReviewId?: boolean
  active?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  categoryReviews?: CategoryReviewSelection
  booking?: BookingSelection
  home?: HomeSelection
}

export interface ReviewRateSelection {
  rates1Stars?: boolean
  rates2Stars?: boolean
  rates3Stars?: boolean
  rates4Stars?: boolean
  rates5Stars?: boolean
  totalRates?: boolean
  avgStars?: boolean
}

export interface ReviewResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: ReviewSelection
}

export interface RingDeviceSelection {
  id?: boolean
  homeId?: boolean
  deviceKind?: boolean
  locationId?: boolean
  name?: boolean
  deviceId?: boolean
  batteryLife?: boolean
  address?: boolean
  latitude?: boolean
  longitude?: boolean
  active?: boolean
  history?: {
    __args: { pagination?: PaginationInput }
  } & RingEventResultsPageSelection
}

export interface RingEventSelection {
  id?: boolean
  deviceId?: boolean
  eventKind?: boolean
  duration?: boolean
  answered?: boolean
  createdAt?: boolean
  occupancy?: HomeOccupancyReadingSelection
  noiseLevel?: HomeNoiseReadingSelection
}

export interface RingEventResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: RingEventSelection
}

export interface RoomSelection {
  id?: boolean
  listOrder?: boolean
  name?: boolean
  description?: boolean
  kind?: boolean
  maxOccupancy?: boolean
  area?: boolean
  bathroomKind?: boolean
  thumbnail?: AssetSelection
  images?: AssetSelection
  sleepingPlaces?: RoomAmenitySelection
  roomAmenities?: RoomAmenitySelection
  bathroomAmenities?: RoomAmenitySelection
}

export interface RoomAmenitiesSelection {
  sleepingPlaces?: AmenitySelection
  roomAmenities?: AmenitySelection
  bathroomAmenities?: AmenitySelection
}

export interface RoomAmenitySelection {
  roomId?: boolean
  amenityId?: boolean
  quantity?: boolean
  name?: boolean
}

export interface SalesIndicatorsSelection {
  averageBookingLength?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  medianBookingLeadTime?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  averageGroupSize?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  cancelledBookings?: {
    __args: { from: IDate; to: IDate }
  } & IndicatorSelection
  returningGuests?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  channelDistribution?: {
    __args: { from: IDate; to: IDate }
  } & ChannelDistributionSelection
  bookings?: { __args: { from: IDate; to: IDate } } & IndicatorSelection
  occupancyRate?: {
    __args: { from: IDate; to: IDate; onlyStabilized?: boolean }
  } & IndicatorSelection
  weekendOccupancyRate?: {
    __args: { from: IDate; to: IDate; onlyStabilized?: boolean }
  } & IndicatorSelection
}

export interface ScheduledJobRunSelection {
  id?: boolean
  job?: boolean
  triggeredAt?: boolean
  executionTime?: boolean
  status?: boolean
  output?: boolean
  steps?: ScheduledJobRunStepSelection
}

export interface ScheduledJobRunStepSelection {
  id?: boolean
  jobRunId?: boolean
  stepName?: boolean
  targetEntityType?: boolean
  targetEntityId?: boolean
  triggeredAt?: boolean
  executionTime?: boolean
  status?: boolean
  output?: boolean
}

export interface SeasonAndDaySelection {
  season?: boolean
  day?: boolean
}

export interface SharedAccessInstructionSelection {
  id?: boolean
  title?: boolean
  displayTitle?: boolean
  template?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  countHomeUses?: boolean
  variables?: AccessVariableProjectionSelection
}

export interface StateSelection {
  id?: boolean
  name?: boolean
  code?: boolean
  countryCode?: boolean
}

export interface TagSelection {
  id?: boolean
  category?: CategorySelection
  name?: boolean
}

export interface TemplateVariableSelection {
  id?: boolean
  dynamic?: boolean
  name?: boolean
}

export interface ThermostatDeviceSelection {
  id?: boolean
  hubId?: boolean
  name?: boolean
  serialNumber?: boolean
  online?: boolean
  temperature?: boolean
  triggeredAt?: boolean
  events?: { __args: { from: IDate; to: IDate } } & ThermostatEventSelection
}

export interface ThermostatEventSelection {
  deviceId?: boolean
  activityType?: boolean
  message?: boolean
  triggeredAt?: boolean
}

export interface UserSelection {
  id?: boolean
  personId?: boolean
  email?: boolean
  emailConfirmed?: boolean
  active?: boolean
  termId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  hasMobileAppInstalled?: boolean
}

export interface WifiRegistrationSelection {
  bookingId?: boolean
  name?: boolean
  email?: boolean
  gender?: boolean
  birthYear?: boolean
  userOs?: boolean
  url?: boolean
  createdAt?: boolean
}

const typesTree = {
  BackOfficeUserMutations: {
    get activate(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get deactivate(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get delete(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get createOrUpdate(): any {
      return {
        __args: {
          email: "String!",
          name: "String!",
          privileges: "[BackOfficePrivilege!]!",
          roles: "[UUID!]"
        }
      }
    },

    get createOrUpdateBackOfficeRole(): any {
      return {
        __args: {
          roles: "[RoleInput!]!"
        }
      }
    }
  },

  BookingMutations: {
    get saveReviews(): any {
      return {
        __args: {
          reviews: "[ReviewInput!]!"
        }
      }
    },

    get disableNotUpdatedReviews(): any {
      return {
        __args: {
          source: "LeadSource!"
        }
      }
    }
  },

  ComplianceMutations: {
    get saveHomeComplianceInformations(): any {
      return {
        __args: {
          homeComplianceInformations: "[HomeComplianceInformationInput!]!"
        }
      }
    },

    get deleteHomeComplianceInformation(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    }
  },

  ExperienceMutations: {
    get update(): any {
      return {
        __args: {
          experienceInputs: "[ExperienceInput!]!"
        }
      }
    },

    get delete(): any {
      return {
        __args: {
          experienceIds: "[UUID!]!"
        }
      }
    }
  },

  HomeAccessInstructionsMutations: {
    get upsertInstructions(): any {
      return {
        __args: {
          homeId: "UUID!",
          lockTypeId: "UUID",
          variables: "[HomeAccessVariableInput!]!",
          instructions: "[HomeAccessInstructionInput!]!",
          shared: "[HomeSharedAccessInstructionInput!]!"
        }
      }
    }
  },

  HomeBooksMutations: {
    get createSection(): any {
      return {
        __args: {
          kind: "BookKind!",
          title: "String!",
          listOrder: "Int"
        }
      }
    },

    get deleteSection(): any {
      return {
        __args: {
          kind: "BookKind!",
          key: "String!"
        }
      }
    },

    get updateSection(): any {
      return {
        __args: {
          input: "BookSectionUpdateInput!"
        }
      }
    },

    get updateSectionDefaultValue(): any {
      return {
        __args: {
          kind: "BookKind!",
          key: "String!",
          value: "String!"
        }
      }
    },

    get updateSections(): any {
      return {
        __args: {
          sections: "[BookSectionUpdateInput!]!"
        }
      }
    },

    get bindSections(): any {
      return {
        __args: {
          sections: "[HomeBookSectionInput!]!"
        }
      }
    }
  },

  HomeMutations: {
    get saveHomePerformanceMetrics(): any {
      return {
        __args: {
          homePerformanceMetricsInput: "[HomePerformanceMetricInput!]!"
        }
      }
    },

    get saveHomeReviewRates(): any {
      return {
        __args: {
          rates: "[HomeReviewRateInput!]!"
        }
      }
    },

    get saveHomeNoiseReadings(): any {
      return {
        __args: {
          homeReadings: "[HomeNoiseReadingInput!]!"
        }
      }
    },

    get saveHomeOccupancyReadings(): any {
      return {
        __args: {
          homeReadings: "[HomeOccupancyReadingInput!]!"
        }
      }
    },

    get addHomeAmenities(): any {
      return {
        __args: {
          homeAmenities: "[HomeAmenityInput!]!"
        }
      }
    },

    get updateHomeAmenities(): any {
      return {
        __args: {
          homeAmenities: "[HomeAmenityInput!]!"
        }
      }
    },

    get deleteHomeAmenities(): any {
      return {
        __args: {
          homeAmenities: "[HomeAmenityInput!]!"
        }
      }
    }
  },

  Mutation: {
    get templateVariables(): any {
      return {
        __args: {
          ids: "[String!]!"
        }
      }
    },

    get updateAllBlocks(): any {
      return {
        __args: {
          filter: "BookingUpdateFilter"
        }
      }
    },

    get updateAllBookings(): any {
      return {
        __args: {
          filter: "BookingUpdateFilter"
        }
      }
    },

    get republishEvent(): any {
      return {
        __args: {
          eventIds: "[UUID!]!"
        }
      }
    },

    get publicToken(): any {
      return {
        __args: {
          email: "String",
          phone: "String"
        }
      }
    },

    get createAsset(): any {
      return {
        __args: {
          assetRequest: "AssetRequest!"
        }
      }
    },

    get createHomeImage(): any {
      return {
        __args: {
          homeId: "UUID!",
          extension: "String!",
          size: "Long",
          fileName: "String"
        }
      }
    },

    get updateBlockedPeriod(): any {
      return {
        __args: {
          id: "UUID",
          input: "BlockedPeriodInput!"
        }
      }
    },

    get deactivateHome(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get offBoardHome(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get updateHome(): any {
      return {
        __args: {
          homeId: "UUID!",
          title: "String!",
          shortDescription: "String!",
          listed: "Boolean!",
          customFields: "[HomeCustomFieldInput!]!"
        }
      }
    },

    get updateHomeParentId(): any {
      return {
        __args: {
          homeId: "UUID!",
          parentId: "UUID"
        }
      }
    },

    get addBuyouts(): any {
      return {
        __args: {
          homeId: "UUID!",
          buyoutIds: "[UUID!]!"
        }
      }
    },

    get deleteBuyouts(): any {
      return {
        __args: {
          homeId: "UUID!",
          buyoutIds: "[UUID!]!"
        }
      }
    },

    get recursiveDeleteBuyouts(): any {
      return {
        __args: {
          buyoutId: "UUID!"
        }
      }
    },

    get updateHomeRooms(): any {
      return {
        __args: {
          homeId: "UUID!",
          rooms: "[RoomUpdate!]!"
        }
      }
    },

    get removeHomeRoom(): any {
      return {
        __args: {
          homeId: "UUID!",
          roomId: "UUID!"
        }
      }
    },

    get removeHomeParentId(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get updateOnBoardingStage(): any {
      return {
        __args: {
          homeId: "UUID!",
          onBoardingStage: "OnBoardingStage!"
        }
      }
    },

    get updateHomeLease(): any {
      return {
        __args: {
          leaseId: "UUID",
          lease: "HomeLeaseInput!"
        }
      }
    },

    get updateRiskLevel(): any {
      return {
        __args: {
          homeId: "UUID!",
          riskLevel: "RiskLevel!"
        }
      }
    },

    get updateHomeLivePeriod(): any {
      return {
        __args: {
          homeId: "UUID!",
          liveSince: "LocalDate",
          liveUntil: "LocalDate"
        }
      }
    },

    get fetchRingRecordingLink(): any {
      return {
        __args: {
          eventId: "UUID!"
        }
      }
    },

    get createAmenity(): any {
      return {
        __args: {
          groupId: "UUID!",
          name: "String!",
          scope: "AmenityScope!"
        }
      }
    },

    get updateAmenityName(): any {
      return {
        __args: {
          amenityId: "UUID!",
          name: "String!"
        }
      }
    },

    get deleteAmenity(): any {
      return {
        __args: {
          amenityId: "UUID!"
        }
      }
    },

    get changeUnderwrittenRevenue(): any {
      return {
        __args: {
          homeId: "UUID!",
          input: "[ProjectedRevenueInput!]!"
        }
      }
    },

    get changeProjectedRevenue(): any {
      return {
        __args: {
          homeId: "UUID!",
          input: "[ProjectedRevenueInput!]!"
        }
      }
    },

    get updateBooking(): any {
      return {
        __args: {
          confirmationIds: "[Int!]!"
        }
      }
    },

    get resendMessage(): any {
      return {
        __args: {
          personNotifyLogId: "UUID!",
          phones: "[String!]",
          emails: "[String!]"
        }
      }
    },

    get addBookingInquiry(): any {
      return {
        __args: {
          inquiry: "InquiryInput!"
        }
      }
    },

    get addBookingConfirmation(): any {
      return {
        __args: {
          confirmation: "ExternalBookingConfirmationInput!"
        }
      }
    },

    get addBookingCodes(): any {
      return {
        __args: {
          confirmationId: "Int!",
          variables: "[BookingCodeVariable!]!",
          instructions: "[BookingCodeTemplate!]!"
        }
      }
    },

    get requestBookingReport(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          sorting: "BookingSorting"
        }
      }
    },

    get requestReviewsReport(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get updateBookingCustomFieldValues(): any {
      return {
        __args: {
          bookingId: "UUID!",
          fieldValues: "[CustomFieldValueUpdateInput!]!"
        }
      }
    },

    get resendCheckInInstructions(): any {
      return {
        __args: {
          bookingId: "UUID!",
          force: "Boolean",
          email: "String"
        }
      }
    },

    get saveWifiRegistration(): any {
      return {
        __args: {
          input: "WifiRegistrationInput!"
        }
      }
    },

    get resendDocumentRequest(): any {
      return {
        __args: {
          bookingId: "UUID!"
        }
      }
    },

    get createBookingQuote(): any {
      return {
        __args: {
          bookingRequest: "BookingQuoteRequest!"
        }
      }
    },

    get createMarriottBooking(): any {
      return {
        __args: {
          bookingRequest: "BookingRequest!",
          contact: "NewContactDetails!"
        }
      }
    },

    get requestContact(): any {
      return {
        __args: {
          request: "ContactRequestInput!"
        }
      }
    },

    get requestPartnership(): any {
      return {
        __args: {
          request: "PartnershipRequestInput!"
        }
      }
    },

    get requestRetreatProposal(): any {
      return {
        __args: {
          content: "String!"
        }
      }
    },

    get updateCustomFieldSections(): any {
      return {
        __args: {
          sections: "[CustomFieldSectionInput!]!"
        }
      }
    },

    get updateCustomFields(): any {
      return {
        __args: {
          customFields: "[CustomFieldInput!]!"
        }
      }
    },

    get createCoupon(): any {
      return {
        __args: {
          code: "String!",
          description: "String",
          salesFrom: "LocalDate",
          salesTo: "LocalDate",
          bookingPeriod: "CouponBookingPeriodType!",
          bookingFrom: "LocalDate!",
          bookingTo: "LocalDate!",
          applicableTo: "CouponHomeApplicableTo!",
          kind: "CouponKind",
          properties: "[UUID!]",
          availableForHighSeason: "Boolean",
          maximumUsages: "Int",
          minimumPrice: "BigDecimal",
          discountType: "DiscountKind!",
          discountValue: "BigDecimal!"
        }
      }
    },

    get enableCoupon(): any {
      return {
        __args: {
          code: "String!"
        }
      }
    },

    get disableCoupon(): any {
      return {
        __args: {
          code: "String!"
        }
      }
    },

    get updateCoupon(): any {
      return {
        __args: {
          input: "CouponUpdateInput!",
          newCode: "String"
        }
      }
    },

    get updateStreamlineCoupon(): any {
      return {
        __args: {
          input: "StreamlineCoupon!"
        }
      }
    },

    get addToBlacklist(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get addCreditCardToBlacklist(): any {
      return {
        __args: {
          number: "String!"
        }
      }
    },

    get removeCreditCardFromBlacklist(): any {
      return {
        __args: {
          number: "String!"
        }
      }
    },

    get deleteFromBlacklist(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get compliance(): any {
      return {
        __fields: typesTree.ComplianceMutations
      }
    },

    get home(): any {
      return {
        __fields: typesTree.HomeMutations
      }
    },

    get experience(): any {
      return {
        __fields: typesTree.ExperienceMutations
      }
    },

    get sharedAccessInstructions(): any {
      return {
        __fields: typesTree.SharedAccessInstructionsMutations
      }
    },

    get homeAccessInstructions(): any {
      return {
        __fields: typesTree.HomeAccessInstructionsMutations
      }
    },

    get homeBooks(): any {
      return {
        __fields: typesTree.HomeBooksMutations
      }
    },

    get booking(): any {
      return {
        __fields: typesTree.BookingMutations
      }
    },

    get backOfficeUser(): any {
      return {
        __fields: typesTree.BackOfficeUserMutations
      }
    }
  },

  SharedAccessInstructionsMutations: {
    get upsertInstructions(): any {
      return {
        __args: {
          variables: "[SharedAccessVariableInput!]!",
          instructions: "[SharedAccessInstructionInput!]!"
        }
      }
    }
  },

  Booking: {
    get messagesSent(): any {
      return {
        __args: {
          templateKind: "TemplateKind",
          status: "PersonNotifyLogStatus",
          query: "String",
          sortOrder: "SortOrder"
        }
      }
    },

    get home(): any {
      return {
        __fields: typesTree.Home
      }
    }
  },

  Coupon: {
    get isValidFor(): any {
      return {
        __args: {
          checkIn: "LocalDate!",
          checkOut: "LocalDate!",
          homeId: "UUID"
        }
      }
    },

    get validForHomes(): any {
      return {
        __args: {
          checkIn: "LocalDate!",
          checkOut: "LocalDate!"
        }
      }
    }
  },

  CustomerExperienceIndicators: {
    get totalNumberOfPainBookings(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get newReviews(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get painBookings(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get reviewsConversion(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get painReservationPercent(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get avgRating(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get positiveReviews(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  FinanceIndicators: {
    get strLtrCoefficient(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get discounts(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get averageDiscount(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get securityDeposits(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get petDeposits(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get outstandingPayments(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolume(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolumePerProperty(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolumePerCheckInPeriod(): any {
      return {
        __args: {
          createdAtFrom: "LocalDate!",
          createdAtUntil: "LocalDate!",
          leadTimeFrom: "Long!",
          leadTimeUntil: "Long!"
        }
      }
    },

    get realizedRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get realizedRevenuePerProperty(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get futureRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get projectedRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get projectedRevenuePerProperty(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get underwrittenRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get availableRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get adr(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get revpau(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  Home: {
    get calendar(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get reviews(): any {
      return {
        __args: {
          source: "LeadSource",
          overallMinRating: "Int",
          overallMaxRating: "Int",
          pagination: "PaginationInput"
        }
      }
    },

    get bookings(): any {
      return {
        __args: {
          from: "LocalDate",
          to: "LocalDate",
          riskLevel: "RiskLevel",
          leadSource: "LeadSource",
          pagination: "PaginationInput",
          sortBy: "BookingSorting",
          sortOrder: "SortOrder"
        }
      }
    },

    get book(): any {
      return {
        __args: {
          kind: "BookKind!"
        }
      }
    },

    get indicators(): any {
      return {
        __fields: typesTree.HomeIndicators,

        __args: {
          granularity: "Granularity"
        }
      }
    },

    get upcomingWeekendsOccupancy(): any {
      return {
        __args: {
          quantity: "Int!"
        }
      }
    },

    get inquiriesByDay(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get inquiriesCount(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get upcomingWeekendsRelativeOccupancy(): any {
      return {
        __args: {
          quantity: "Int"
        }
      }
    },

    get projectedRevenues(): any {
      return {
        __args: {
          from: "LocalDate",
          to: "LocalDate"
        }
      }
    },

    get ringDevicesHistory(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    },

    get pricingHistory(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    },

    get parent(): any {
      return {
        __fields: typesTree.Home
      }
    },

    get ongoingBooking(): any {
      return {
        __fields: typesTree.Booking
      }
    }
  },

  HomeFinanceIndicators: {
    get health(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get strLtrCoefficient(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get discounts(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get averageDiscount(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get securityDeposits(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get petDeposits(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get outstandingPayments(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolume(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolumePerCheckInPeriod(): any {
      return {
        __args: {
          createdAtFrom: "LocalDate!",
          createdAtUntil: "LocalDate!",
          leadTimeFrom: "Long!",
          leadTimeUntil: "Long!"
        }
      }
    },

    get realizedRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get futureRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get projectedRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get underwrittenRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get availableRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get adr(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get revpau(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  InboxQueries: {
    get conversationContext(): any {
      return {
        __fields: typesTree.ConversationContext,

        __args: {
          conversationId: "String!"
        }
      }
    }
  },

  InsightsFields: {
    get firstAppLogins(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingsCountByMonth(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingsWithLoginsCountByMonth(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get occupancyVersusInquiriesPerHome(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          createdFrom: "LocalDate",
          createdTo: "LocalDate",
          onlyStabilized: "Boolean"
        }
      }
    },

    get occupancyVersusInquiriesPerRegion(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          createdFrom: "LocalDate",
          createdTo: "LocalDate",
          onlyStabilized: "Boolean"
        }
      }
    }
  },

  OperationsIndicators: {
    get checkIns(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get checkOuts(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get preStayInspections(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get postStayInspections(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get inspectionRate(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          inspectionKind: "HomeInspectionKind!"
        }
      }
    },

    get openWorkOrders(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get closedWorkOrders(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  Query: {
    get globalIndicators(): any {
      return {
        __fields: typesTree.Indicators,

        __args: {
          region: "UUID",
          liveStatus: "OnBoardingStage",
          assetType: "AssetType",
          granularity: "Granularity"
        }
      }
    },

    get region(): any {
      return {
        __fields: typesTree.RegionFull,

        __args: {
          regionId: "UUID!"
        }
      }
    },

    get regions(): any {
      return {
        __args: {
          onlyActive: "Boolean",
          featuredOnly: "Boolean",
          pagination: "PaginationInput"
        }
      }
    },

    get home(): any {
      return {
        __fields: typesTree.Home,

        __args: {
          homeId: "UUID",
          homePmsExternalId: "Int",
          leadSourceId: "HomeLeadSourceIdInput"
        }
      }
    },

    get homeByListing(): any {
      return {
        __fields: typesTree.Home,

        __args: {
          source: "LeadSource!",
          externalId: "Int!"
        }
      }
    },

    get homes(): any {
      return {
        __args: {
          homeIds: "[UUID!]",
          regionId: "UUID",
          name: "String",
          onBoardingStatuses: "[OnBoardingStage!]",
          onlyActive: "Boolean",
          checkIn: "LocalDate",
          checkOut: "LocalDate",
          minPrice: "BigDecimal",
          maxPrice: "BigDecimal",
          minOccupancy: "Int",
          minPets: "Int",
          inHouseMonitoringStatuses: "[InHouseMonitoringStatus!]",
          sort: "HomeQuerySorting",
          pagination: "PaginationInput"
        }
      }
    },

    get experiences(): any {
      return {
        __args: {
          period: "DateRangeInput",
          regionId: "UUID",
          experienceKindName: "ExperienceKindName",
          pagination: "PaginationInput"
        }
      }
    },

    get homesCounting(): any {
      return {
        __args: {
          regionId: "UUID"
        }
      }
    },

    get homesSourceListedCounting(): any {
      return {
        __args: {
          regionId: "UUID"
        }
      }
    },

    get sharedAccessInstructions(): any {
      return {
        __args: {
          terms: "String"
        }
      }
    },

    get homeFuzzySearch(): any {
      return {
        __fields: typesTree.Home,

        __args: {
          name: "String!",
          onlyActive: "Boolean",
          showVirtual: "Boolean"
        }
      }
    },

    get pricingHistory(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    },

    get pricingHistoryLink(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    },

    get requestExportPricingDetails(): any {
      return {
        __args: {
          period: "DateRangeInput!",
          homeIds: "[UUID!]",
          regionId: "UUID",
          onBoardingStatus: "[OnBoardingStatus!]!"
        }
      }
    },

    get requestExportPricingDetailsToEmail(): any {
      return {
        __args: {
          period: "DateRangeInput!",
          email: "String!",
          homeIds: "[UUID!]",
          regionId: "UUID",
          onBoardingStatus: "[OnBoardingStatus!]!"
        }
      }
    },

    get amenities(): any {
      return {
        __args: {
          scope: "AmenityScope"
        }
      }
    },

    get blockedHomes(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get ancestors(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get successors(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get homeBook(): any {
      return {
        __args: {
          homeId: "UUID!",
          kind: "BookKind!"
        }
      }
    },

    get bookSections(): any {
      return {
        __args: {
          kind: "BookKind!"
        }
      }
    },

    get bookSectionsForRegion(): any {
      return {
        __args: {
          kind: "BookKind!",
          regionId: "UUID!"
        }
      }
    },

    get bookSectionHistory(): any {
      return {
        __args: {
          kind: "BookKind!",
          key: "String!",
          limit: "Int"
        }
      }
    },

    get homeBookSectionHistory(): any {
      return {
        __args: {
          homeId: "UUID!",
          kind: "BookKind!",
          key: "String!",
          limit: "Int"
        }
      }
    },

    get occupancyBenchmarkByHomes(): any {
      return {
        __args: {
          homeIds: "[UUID!]!",
          dateRange: "DateRangeInput!"
        }
      }
    },

    get occupancyBenchmarkByRegions(): any {
      return {
        __args: {
          regionIds: "[UUID!]!",
          dateRange: "DateRangeInput!"
        }
      }
    },

    get realizedRevenueBenchmarkByHome(): any {
      return {
        __args: {
          homeIds: "[UUID!]!",
          dateRange: "DateRangeInput!"
        }
      }
    },

    get realizedRevenueBenchmarkByRegion(): any {
      return {
        __args: {
          regionIds: "[UUID!]!",
          dateRange: "DateRangeInput!"
        }
      }
    },

    get bookedRevenueBenchmarkByHome(): any {
      return {
        __args: {
          homeIds: "[UUID!]!",
          dateRange: "DateRangeInput!"
        }
      }
    },

    get bookedRevenueBenchmarkByRegion(): any {
      return {
        __args: {
          regionIds: "[UUID!]!",
          dateRange: "DateRangeInput!"
        }
      }
    },

    get booking(): any {
      return {
        __fields: typesTree.Booking,

        __args: {
          bookingId: "UUID!"
        }
      }
    },

    get bookingQuotes(): any {
      return {
        __args: {
          term: "String",
          startDate: "LocalDateTime",
          endDate: "LocalDateTime",
          deliveredStatus: "PersonNotifyLogStatus",
          onlyBooked: "Boolean",
          pagination: "PaginationInput"
        }
      }
    },

    get pendingBookingIssues(): any {
      return {
        __args: {
          filter: "String",
          regionId: "UUID",
          issues: "[BookingIssue!]"
        }
      }
    },

    get bookings(): any {
      return {
        __args: {
          filter: "String",
          from: "LocalDate",
          to: "LocalDate",
          regionId: "UUID",
          homeId: "UUID",
          riskLevel: "RiskLevel",
          leadSource: "LeadSource",
          pagination: "PaginationInput",
          periodReference: "BookingPeriodReference",
          sortBy: "BookingSorting",
          sortOrder: "SortOrder",
          status: "[BookingStatus!]"
        }
      }
    },

    get bookingPersonNotifyLogs(): any {
      return {
        __args: {
          bookingId: "UUID"
        }
      }
    },

    get personNotifyLogs(): any {
      return {
        __args: {
          personNotifyLogId: "UUID!"
        }
      }
    },

    get reviews(): any {
      return {
        __args: {
          source: "LeadSource",
          pagination: "PaginationInput"
        }
      }
    },

    get customFields(): any {
      return {
        __args: {
          customFieldSectionId: "UUID"
        }
      }
    },

    get customFieldSections(): any {
      return {
        __args: {
          scope: "CustomFieldScope!",
          sectionId: "UUID",
          readOnly: "Boolean",
          showDisabled: "Boolean"
        }
      }
    },

    get coupon(): any {
      return {
        __fields: typesTree.Coupon,

        __args: {
          code: "String!"
        }
      }
    },

    get coupons(): any {
      return {
        __args: {
          searchTerm: "String",
          enabledOnly: "Boolean",
          validOnly: "Boolean",
          includeQuotes: "Boolean",
          sortBy: "CouponSorting",
          sortOrder: "SortOrder",
          pagination: "PaginationInput"
        }
      }
    },

    get backOfficeUser(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get backOfficeUsers(): any {
      return {
        __args: {
          terms: "String",
          includeInactive: "Boolean"
        }
      }
    },

    get blacklistedCreditCards(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    },

    get blacklistedEmails(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    },

    get person(): any {
      return {
        __args: {
          id: "UUID!"
        }
      }
    },

    get scheduledJobRuns(): any {
      return {
        __args: {
          from: "LocalDate",
          to: "LocalDate"
        }
      }
    },

    get scheduledJobRun(): any {
      return {
        __args: {
          id: "UUID!"
        }
      }
    },

    get omniSearch(): any {
      return {
        __args: {
          term: "String!"
        }
      }
    },

    get insights(): any {
      return {
        __fields: typesTree.InsightsFields
      }
    },

    get inbox(): any {
      return {
        __fields: typesTree.InboxQueries
      }
    }
  },

  RegionCustomerExperienceIndicators: {
    get totalNumberOfPainBookings(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get painBookings(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get reviewsConversion(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get painReservationPercent(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get avgRating(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get positiveReviews(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  RegionFinanceIndicators: {
    get health(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get strLtrCoefficient(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolume(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookingVolumePerProperty(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get realizedRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get realizedRevenuePerProperty(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get futureRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get projectedRevenue(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get projectedRevenuePerProperty(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  RegionFull: {
    get upcomingWeekendsRelativeOccupancy(): any {
      return {
        __args: {
          quantity: "Int"
        }
      }
    },

    get ratings(): any {
      return {
        __args: {
          from: "LocalDate",
          to: "LocalDate",
          onBoardingStatuses: "[OnBoardingStatus!]",
          riskLevels: "[RiskLevel!]"
        }
      }
    },

    get reviews(): any {
      return {
        __args: {
          source: "LeadSource",
          overallMinRating: "Int",
          overallMaxRating: "Int",
          pagination: "PaginationInput"
        }
      }
    },

    get indicators(): any {
      return {
        __fields: typesTree.RegionIndicators,

        __args: {
          onBoardingStatus: "[OnBoardingStatus!]",
          assetType: "AssetType",
          granularity: "Granularity"
        }
      }
    }
  },

  RegionSalesIndicators: {
    get occupancyRate(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          onlyStabilized: "Boolean"
        }
      }
    },

    get weekendOccupancyRate(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          onlyStabilized: "Boolean"
        }
      }
    }
  },

  RingDevice: {
    get history(): any {
      return {
        __args: {
          pagination: "PaginationInput"
        }
      }
    }
  },

  SalesIndicators: {
    get averageBookingLength(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get medianBookingLeadTime(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get averageGroupSize(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get cancelledBookings(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get returningGuests(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get channelDistribution(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get bookings(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get occupancyRate(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          onlyStabilized: "Boolean"
        }
      }
    },

    get weekendOccupancyRate(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!",
          onlyStabilized: "Boolean"
        }
      }
    }
  },

  ThermostatDevice: {
    get events(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    }
  },

  BookingQuoteCoupon: {
    get coupon(): any {
      return {
        __fields: typesTree.Coupon
      }
    }
  },

  BookingWithIssues: {
    get booking(): any {
      return {
        __fields: typesTree.Booking
      }
    }
  },

  ConversationContext: {
    get currentBooking(): any {
      return {
        __fields: typesTree.Booking
      }
    }
  },

  HomeIndicators: {
    get finance(): any {
      return {
        __fields: typesTree.HomeFinanceIndicators
      }
    },

    get sales(): any {
      return {
        __fields: typesTree.SalesIndicators
      }
    },

    get customerExperience(): any {
      return {
        __fields: typesTree.CustomerExperienceIndicators
      }
    },

    get operations(): any {
      return {
        __fields: typesTree.OperationsIndicators
      }
    }
  },

  Indicators: {
    get finance(): any {
      return {
        __fields: typesTree.FinanceIndicators
      }
    },

    get sales(): any {
      return {
        __fields: typesTree.SalesIndicators
      }
    },

    get customerExperience(): any {
      return {
        __fields: typesTree.CustomerExperienceIndicators
      }
    },

    get operations(): any {
      return {
        __fields: typesTree.OperationsIndicators
      }
    }
  },

  JaimitoInquiry: {
    get home(): any {
      return {
        __fields: typesTree.Home
      }
    }
  },

  OccupancyInquiriesPerHomeProjection: {
    get home(): any {
      return {
        __fields: typesTree.Home
      }
    }
  },

  PricingHistory: {
    get home(): any {
      return {
        __fields: typesTree.Home
      }
    }
  },

  RegionIndicators: {
    get finance(): any {
      return {
        __fields: typesTree.RegionFinanceIndicators
      }
    },

    get sales(): any {
      return {
        __fields: typesTree.RegionSalesIndicators
      }
    },

    get customerExperience(): any {
      return {
        __fields: typesTree.RegionCustomerExperienceIndicators
      }
    }
  },

  Review: {
    get booking(): any {
      return {
        __fields: typesTree.Booking
      }
    },

    get home(): any {
      return {
        __fields: typesTree.Home
      }
    }
  }
}

let _client = new GraphQLClient(
  "https://arriere.stage.avantstay.dev/backoffice/graphql"
)

function apiEndpoint<I, O>(kind: "mutation" | "query", name: string) {
  return async <S extends I>(jsonQuery?: S): Promise<Projection<S, O>> => {
    // noinspection TypeScriptUnresolvedVariable
    const { query, variables } = jsonToGraphQLQuery({
      kind,
      name,
      jsonQuery,
      typesTree
    })
    const response = await _client.request(query, variables)
    return response[name]
  }
}

export default {
  setClient: (url: string, options?: Options) => {
    _client = new GraphQLClient(url, options)
  },
  setHeader: (key: string, value: string) => {
    _client.setHeader(key, value)
  },
  setHeaders: (headers: { [k: string]: string }) => {
    _client.setHeaders(headers)
  },
  queries: {
    globalIndicators: apiEndpoint<
      {
        __args: {
          region?: UUID
          liveStatus: OnBoardingStage
          assetType: AssetType
          granularity: Granularity
        }
      } & IndicatorsSelection,
      DeepRequired<Indicators>
    >("query", "globalIndicators"),
    insights: apiEndpoint<
      InsightsFieldsSelection,
      DeepRequired<InsightsFields>
    >("query", "insights"),
    region: apiEndpoint<
      { __args: { regionId: UUID } } & RegionFullSelection,
      DeepRequired<Maybe<RegionFull>>
    >("query", "region"),
    regions: apiEndpoint<
      {
        __args: {
          onlyActive?: boolean
          featuredOnly?: boolean
          pagination?: PaginationInput
        }
      } & RegionResultsPageSelection,
      DeepRequired<RegionResultsPage>
    >("query", "regions"),
    compliance: apiEndpoint<
      ComplianceQueriesSelection,
      DeepRequired<ComplianceQueries>
    >("query", "compliance"),
    home: apiEndpoint<
      {
        __args: {
          homeId?: UUID
          homePmsExternalId?: number
          leadSourceId?: HomeLeadSourceIdInput
        }
      } & HomeSelection,
      DeepRequired<Maybe<Home>>
    >("query", "home"),
    homeByListing: apiEndpoint<
      { __args: { source: LeadSource; externalId: number } } & HomeSelection,
      DeepRequired<Maybe<Home>>
    >("query", "homeByListing"),
    homes: apiEndpoint<
      {
        __args: {
          homeIds?: UUID[]
          regionId?: UUID
          name?: string
          onBoardingStatuses?: OnBoardingStage[]
          onlyActive?: boolean
          checkIn?: IDate
          checkOut?: IDate
          minPrice?: number
          maxPrice?: number
          minOccupancy?: number
          minPets?: number
          inHouseMonitoringStatuses?: InHouseMonitoringStatus[]
          sort: HomeQuerySorting
          pagination?: PaginationInput
        }
      } & HomeResultsPageSelection,
      DeepRequired<HomeResultsPage>
    >("query", "homes"),
    experiences: apiEndpoint<
      {
        __args: {
          period?: DateRangeInput
          regionId?: UUID
          experienceKindName: ExperienceKindName
          pagination?: PaginationInput
        }
      } & ExperienceResultsPageSelection,
      DeepRequired<ExperienceResultsPage>
    >("query", "experiences"),
    homesCounting: apiEndpoint<
      { __args: { regionId?: UUID } } & HomesCountingViewSelection,
      DeepRequired<HomesCountingView>
    >("query", "homesCounting"),
    homesSourceListedCounting: apiEndpoint<
      { __args: { regionId?: UUID } } & HomeSourceListedCounterViewSelection,
      DeepRequired<HomeSourceListedCounterView>
    >("query", "homesSourceListedCounting"),
    sharedAccessInstructions: apiEndpoint<
      { __args: { terms?: string } } & SharedAccessInstructionSelection,
      DeepRequired<SharedAccessInstruction[]>
    >("query", "sharedAccessInstructions"),
    sharedAccessVariables: apiEndpoint<
      AccessVariableProjectionSelection,
      DeepRequired<AccessVariableProjection[]>
    >("query", "sharedAccessVariables"),
    blockedPeriods: apiEndpoint<
      BlockedPeriodSelection,
      DeepRequired<BlockedPeriod[]>
    >("query", "blockedPeriods"),
    homeRoomAmenities: apiEndpoint<
      RoomAmenitiesSelection,
      DeepRequired<RoomAmenities>
    >("query", "homeRoomAmenities"),
    homeFuzzySearch: apiEndpoint<
      {
        __args: { name: string; onlyActive?: boolean; showVirtual?: boolean }
      } & HomeSelection,
      DeepRequired<Maybe<Home>>
    >("query", "homeFuzzySearch"),
    pricingHistory: apiEndpoint<
      {
        __args: { pagination?: PaginationInput }
      } & PricingHistoryProjectionResultsPageSelection,
      DeepRequired<PricingHistoryProjectionResultsPage>
    >("query", "pricingHistory"),
    pricingHistoryLink: apiEndpoint<
      { __args: { pagination?: PaginationInput } },
      DeepRequired<string>
    >("query", "pricingHistoryLink"),
    requestExportPricingDetails: apiEndpoint<
      {
        __args: {
          period: DateRangeInput
          homeIds?: UUID[]
          regionId?: UUID
          onBoardingStatus: OnBoardingStatus[]
        }
      },
      DeepRequired<string>
    >("query", "requestExportPricingDetails"),
    requestExportPricingDetailsToEmail: apiEndpoint<
      {
        __args: {
          period: DateRangeInput
          email: string
          homeIds?: UUID[]
          regionId?: UUID
          onBoardingStatus: OnBoardingStatus[]
        }
      },
      DeepRequired<boolean>
    >("query", "requestExportPricingDetailsToEmail"),
    amenities: apiEndpoint<
      { __args: { scope: AmenityScope } } & AmenityProjectionSelection,
      DeepRequired<AmenityProjection[]>
    >("query", "amenities"),
    blockedHomes: apiEndpoint<
      { __args: { homeId: UUID } } & HomeSelection,
      DeepRequired<Home[]>
    >("query", "blockedHomes"),
    ancestors: apiEndpoint<{ __args: { homeId: UUID } }, DeepRequired<UUID[]>>(
      "query",
      "ancestors"
    ),
    successors: apiEndpoint<{ __args: { homeId: UUID } }, DeepRequired<UUID[]>>(
      "query",
      "successors"
    ),
    homeBook: apiEndpoint<
      { __args: { homeId: UUID; kind: BookKind } } & HomeBookSelection,
      DeepRequired<HomeBook>
    >("query", "homeBook"),
    bookSections: apiEndpoint<
      { __args: { kind: BookKind } } & BookSectionSelection,
      DeepRequired<BookSection[]>
    >("query", "bookSections"),
    bookSectionsForRegion: apiEndpoint<
      { __args: { kind: BookKind; regionId: UUID } } & BookSectionSelection,
      DeepRequired<BookSection[]>
    >("query", "bookSectionsForRegion"),
    bookSectionHistory: apiEndpoint<
      {
        __args: { kind: BookKind; key: string; limit?: number }
      } & EventProjectionSelection,
      DeepRequired<EventProjection[]>
    >("query", "bookSectionHistory"),
    homeBookSectionHistory: apiEndpoint<
      {
        __args: { homeId: UUID; kind: BookKind; key: string; limit?: number }
      } & EventProjectionSelection,
      DeepRequired<EventProjection[]>
    >("query", "homeBookSectionHistory"),
    occupancyBenchmarkByHomes: apiEndpoint<
      {
        __args: { homeIds: UUID[]; dateRange: DateRangeInput }
      } & BenchmarkSelection,
      DeepRequired<Benchmark[]>
    >("query", "occupancyBenchmarkByHomes"),
    occupancyBenchmarkByRegions: apiEndpoint<
      {
        __args: { regionIds: UUID[]; dateRange: DateRangeInput }
      } & BenchmarkSelection,
      DeepRequired<Benchmark[]>
    >("query", "occupancyBenchmarkByRegions"),
    realizedRevenueBenchmarkByHome: apiEndpoint<
      {
        __args: { homeIds: UUID[]; dateRange: DateRangeInput }
      } & BenchmarkSelection,
      DeepRequired<Benchmark[]>
    >("query", "realizedRevenueBenchmarkByHome"),
    realizedRevenueBenchmarkByRegion: apiEndpoint<
      {
        __args: { regionIds: UUID[]; dateRange: DateRangeInput }
      } & BenchmarkSelection,
      DeepRequired<Benchmark[]>
    >("query", "realizedRevenueBenchmarkByRegion"),
    bookedRevenueBenchmarkByHome: apiEndpoint<
      {
        __args: { homeIds: UUID[]; dateRange: DateRangeInput }
      } & BenchmarkSelection,
      DeepRequired<Benchmark[]>
    >("query", "bookedRevenueBenchmarkByHome"),
    bookedRevenueBenchmarkByRegion: apiEndpoint<
      {
        __args: { regionIds: UUID[]; dateRange: DateRangeInput }
      } & BenchmarkSelection,
      DeepRequired<Benchmark[]>
    >("query", "bookedRevenueBenchmarkByRegion"),
    lockTypes: apiEndpoint<LockTypeSelection, DeepRequired<LockType[]>>(
      "query",
      "lockTypes"
    ),
    booking: apiEndpoint<
      { __args: { bookingId: UUID } } & BookingSelection,
      DeepRequired<Booking>
    >("query", "booking"),
    bookingQuotes: apiEndpoint<
      {
        __args: {
          term?: string
          startDate?: IDate
          endDate?: IDate
          deliveredStatus: PersonNotifyLogStatus
          onlyBooked?: boolean
          pagination?: PaginationInput
        }
      } & BookingQuoteResultsPageSelection,
      DeepRequired<BookingQuoteResultsPage>
    >("query", "bookingQuotes"),
    pendingBookingIssues: apiEndpoint<
      {
        __args: { filter?: string; regionId?: UUID; issues?: BookingIssue[] }
      } & BookingWithIssuesSelection,
      DeepRequired<BookingWithIssues[]>
    >("query", "pendingBookingIssues"),
    bookings: apiEndpoint<
      {
        __args: {
          filter?: string
          from?: IDate
          to?: IDate
          regionId?: UUID
          homeId?: UUID
          riskLevel: RiskLevel
          leadSource: LeadSource
          pagination?: PaginationInput
          periodReference: BookingPeriodReference
          sortBy: BookingSorting
          sortOrder: SortOrder
          status?: BookingStatus[]
        }
      } & BookingResultsPageSelection,
      DeepRequired<BookingResultsPage>
    >("query", "bookings"),
    bookingPersonNotifyLogs: apiEndpoint<
      { __args: { bookingId?: UUID } } & PersonNotifyLogSelection,
      DeepRequired<PersonNotifyLog[]>
    >("query", "bookingPersonNotifyLogs"),
    personNotifyLogs: apiEndpoint<
      { __args: { personNotifyLogId: UUID } } & PersonNotifyLogSelection,
      DeepRequired<Maybe<PersonNotifyLog>>
    >("query", "personNotifyLogs"),
    reviews: apiEndpoint<
      {
        __args: { source: LeadSource; pagination?: PaginationInput }
      } & ReviewResultsPageSelection,
      DeepRequired<ReviewResultsPage>
    >("query", "reviews"),
    configurationFields: apiEndpoint<
      CustomFieldSectionProjectionSelection,
      DeepRequired<CustomFieldSectionProjection[]>
    >("query", "configurationFields"),
    customFields: apiEndpoint<
      {
        __args: { customFieldSectionId?: UUID }
      } & ExtendedCustomFieldSelection,
      DeepRequired<ExtendedCustomField[]>
    >("query", "customFields"),
    customFieldSections: apiEndpoint<
      {
        __args: {
          scope: CustomFieldScope
          sectionId?: UUID
          readOnly?: boolean
          showDisabled?: boolean
        }
      } & ExtendedCustomFieldSectionSelection,
      DeepRequired<ExtendedCustomFieldSection[]>
    >("query", "customFieldSections"),
    coupon: apiEndpoint<
      { __args: { code: string } } & CouponSelection,
      DeepRequired<Maybe<Coupon>>
    >("query", "coupon"),
    coupons: apiEndpoint<
      {
        __args: {
          searchTerm?: string
          enabledOnly?: boolean
          validOnly?: boolean
          includeQuotes?: boolean
          sortBy: CouponSorting
          sortOrder: SortOrder
          pagination?: PaginationInput
        }
      } & CouponProjectionResultsPageSelection,
      DeepRequired<CouponProjectionResultsPage>
    >("query", "coupons"),
    couponCounters: apiEndpoint<
      CouponCountersSelection,
      DeepRequired<CouponCounters>
    >("query", "couponCounters"),
    me: apiEndpoint<
      BackOfficeUserSelection,
      DeepRequired<Maybe<BackOfficeUser>>
    >("query", "me"),
    backOfficeUser: apiEndpoint<
      { __args: { email: string } } & BackOfficeUserSelection,
      DeepRequired<Maybe<BackOfficeUser>>
    >("query", "backOfficeUser"),
    backOfficeUsers: apiEndpoint<
      {
        __args: { terms?: string; includeInactive?: boolean }
      } & BackOfficeUserSelection,
      DeepRequired<BackOfficeUser[]>
    >("query", "backOfficeUsers"),
    backOfficePrivileges: apiEndpoint<
      undefined,
      DeepRequired<BackOfficePrivilege[]>
    >("query", "backOfficePrivileges"),
    blacklistedCreditCards: apiEndpoint<
      {
        __args: { pagination?: PaginationInput }
      } & BlacklistedCreditCardResultsPageSelection,
      DeepRequired<BlacklistedCreditCardResultsPage>
    >("query", "blacklistedCreditCards"),
    blacklistedEmails: apiEndpoint<
      {
        __args: { pagination?: PaginationInput }
      } & BlacklistedEmailResultsPageSelection,
      DeepRequired<BlacklistedEmailResultsPage>
    >("query", "blacklistedEmails"),
    roles: apiEndpoint<BackOfficeRoleSelection, DeepRequired<BackOfficeRole[]>>(
      "query",
      "roles"
    ),
    person: apiEndpoint<
      { __args: { id: UUID } } & PersonSelection,
      DeepRequired<Maybe<Person>>
    >("query", "person"),
    scheduledJobRuns: apiEndpoint<
      { __args: { from?: IDate; to?: IDate } } & ScheduledJobRunSelection,
      DeepRequired<ScheduledJobRun[]>
    >("query", "scheduledJobRuns"),
    scheduledJobRun: apiEndpoint<
      { __args: { id: UUID } } & ScheduledJobRunSelection,
      DeepRequired<ScheduledJobRun>
    >("query", "scheduledJobRun"),
    prospectPartners: apiEndpoint<
      ProspectPartnerSelection,
      DeepRequired<ProspectPartner[]>
    >("query", "prospectPartners"),
    omniSearch: apiEndpoint<
      { __args: { term: string } } & OmniSearchResultsSelection,
      DeepRequired<OmniSearchResults>
    >("query", "omniSearch"),
    inbox: apiEndpoint<InboxQueriesSelection, DeepRequired<InboxQueries>>(
      "query",
      "inbox"
    )
  },
  mutations: {
    templateVariables: apiEndpoint<
      { __args: { ids: string[] } } & TemplateVariableSelection,
      DeepRequired<TemplateVariable[]>
    >("mutation", "templateVariables"),
    updateAllBlocks: apiEndpoint<
      { __args: { filter?: BookingUpdateFilter } },
      DeepRequired<boolean>
    >("mutation", "updateAllBlocks"),
    updateAllBookings: apiEndpoint<
      { __args: { filter?: BookingUpdateFilter } },
      DeepRequired<boolean>
    >("mutation", "updateAllBookings"),
    updateCutsheets: apiEndpoint<undefined, DeepRequired<boolean>>(
      "mutation",
      "updateCutsheets"
    ),
    updateCutsheetsPart2: apiEndpoint<undefined, DeepRequired<boolean>>(
      "mutation",
      "updateCutsheetsPart2"
    ),
    republishEvent: apiEndpoint<
      { __args: { eventIds: UUID[] } },
      DeepRequired<boolean>
    >("mutation", "republishEvent"),
    publicToken: apiEndpoint<
      { __args: { email?: string; phone?: string } },
      DeepRequired<string>
    >("mutation", "publicToken"),
    createAsset: apiEndpoint<
      { __args: { assetRequest: AssetRequest } } & AssetUploadInfoSelection,
      DeepRequired<AssetUploadInfo>
    >("mutation", "createAsset"),
    compliance: apiEndpoint<
      ComplianceMutationsSelection,
      DeepRequired<ComplianceMutations>
    >("mutation", "compliance"),
    home: apiEndpoint<HomeMutationsSelection, DeepRequired<HomeMutations>>(
      "mutation",
      "home"
    ),
    experience: apiEndpoint<
      ExperienceMutationsSelection,
      DeepRequired<ExperienceMutations>
    >("mutation", "experience"),
    createHomeImage: apiEndpoint<
      {
        __args: {
          homeId: UUID
          extension: string
          size?: number
          fileName?: string
        }
      } & AssetUploadInfoSelection,
      DeepRequired<AssetUploadInfo>
    >("mutation", "createHomeImage"),
    updateBlockedPeriod: apiEndpoint<
      { __args: { id?: UUID; input: BlockedPeriodInput } },
      DeepRequired<boolean>
    >("mutation", "updateBlockedPeriod"),
    deactivateHome: apiEndpoint<
      { __args: { homeId: UUID } },
      DeepRequired<boolean>
    >("mutation", "deactivateHome"),
    offBoardHome: apiEndpoint<
      { __args: { homeId: UUID } },
      DeepRequired<boolean>
    >("mutation", "offBoardHome"),
    updateHome: apiEndpoint<
      {
        __args: {
          homeId: UUID
          title: string
          shortDescription: string
          listed: boolean
          customFields: HomeCustomFieldInput[]
        }
      },
      DeepRequired<boolean>
    >("mutation", "updateHome"),
    updateHomeParentId: apiEndpoint<
      { __args: { homeId: UUID; parentId?: UUID } },
      DeepRequired<boolean>
    >("mutation", "updateHomeParentId"),
    addBuyouts: apiEndpoint<
      { __args: { homeId: UUID; buyoutIds: UUID[] } },
      DeepRequired<number>
    >("mutation", "addBuyouts"),
    deleteBuyouts: apiEndpoint<
      { __args: { homeId: UUID; buyoutIds: UUID[] } },
      DeepRequired<number>
    >("mutation", "deleteBuyouts"),
    recursiveDeleteBuyouts: apiEndpoint<
      { __args: { buyoutId: UUID } },
      DeepRequired<number>
    >("mutation", "recursiveDeleteBuyouts"),
    updateHomeRooms: apiEndpoint<
      { __args: { homeId: UUID; rooms: RoomUpdate[] } } & RoomSelection,
      DeepRequired<Room[]>
    >("mutation", "updateHomeRooms"),
    removeHomeRoom: apiEndpoint<
      { __args: { homeId: UUID; roomId: UUID } },
      DeepRequired<boolean>
    >("mutation", "removeHomeRoom"),
    removeHomeParentId: apiEndpoint<
      { __args: { homeId: UUID } },
      DeepRequired<boolean>
    >("mutation", "removeHomeParentId"),
    updateOnBoardingStage: apiEndpoint<
      { __args: { homeId: UUID; onBoardingStage: OnBoardingStage } },
      DeepRequired<boolean>
    >("mutation", "updateOnBoardingStage"),
    updateHomeLease: apiEndpoint<
      {
        __args: { leaseId?: UUID; lease: HomeLeaseInput }
      } & HomeLeaseSelection,
      DeepRequired<Maybe<HomeLease>>
    >("mutation", "updateHomeLease"),
    updateRiskLevel: apiEndpoint<
      { __args: { homeId: UUID; riskLevel: RiskLevel } },
      DeepRequired<boolean>
    >("mutation", "updateRiskLevel"),
    updateHomeLivePeriod: apiEndpoint<
      { __args: { homeId: UUID; liveSince?: IDate; liveUntil?: IDate } },
      DeepRequired<boolean>
    >("mutation", "updateHomeLivePeriod"),
    fetchRingRecordingLink: apiEndpoint<
      { __args: { eventId: UUID } },
      DeepRequired<Maybe<string>>
    >("mutation", "fetchRingRecordingLink"),
    sharedAccessInstructions: apiEndpoint<
      SharedAccessInstructionsMutationsSelection,
      DeepRequired<SharedAccessInstructionsMutations>
    >("mutation", "sharedAccessInstructions"),
    homeAccessInstructions: apiEndpoint<
      HomeAccessInstructionsMutationsSelection,
      DeepRequired<HomeAccessInstructionsMutations>
    >("mutation", "homeAccessInstructions"),
    createAmenity: apiEndpoint<
      {
        __args: { groupId: UUID; name: string; scope: AmenityScope }
      } & AmenitySelection,
      DeepRequired<Amenity>
    >("mutation", "createAmenity"),
    updateAmenityName: apiEndpoint<
      { __args: { amenityId: UUID; name: string } },
      DeepRequired<boolean>
    >("mutation", "updateAmenityName"),
    deleteAmenity: apiEndpoint<
      { __args: { amenityId: UUID } },
      DeepRequired<boolean>
    >("mutation", "deleteAmenity"),
    homeBooks: apiEndpoint<
      HomeBooksMutationsSelection,
      DeepRequired<HomeBooksMutations>
    >("mutation", "homeBooks"),
    changeUnderwrittenRevenue: apiEndpoint<
      { __args: { homeId: UUID; input: ProjectedRevenueInput[] } },
      DeepRequired<number>
    >("mutation", "changeUnderwrittenRevenue"),
    changeProjectedRevenue: apiEndpoint<
      { __args: { homeId: UUID; input: ProjectedRevenueInput[] } },
      DeepRequired<number>
    >("mutation", "changeProjectedRevenue"),
    booking: apiEndpoint<
      BookingMutationsSelection,
      DeepRequired<BookingMutations>
    >("mutation", "booking"),
    updateBooking: apiEndpoint<
      { __args: { confirmationIds: number[] } } & BookingSelection,
      DeepRequired<Booking[]>
    >("mutation", "updateBooking"),
    resendMessage: apiEndpoint<
      {
        __args: {
          personNotifyLogId: UUID
          phones?: string[]
          emails?: string[]
        }
      },
      DeepRequired<string>
    >("mutation", "resendMessage"),
    addBookingInquiry: apiEndpoint<
      { __args: { inquiry: InquiryInput } } & InquirySelection,
      DeepRequired<Inquiry>
    >("mutation", "addBookingInquiry"),
    addBookingConfirmation: apiEndpoint<
      {
        __args: { confirmation: ExternalBookingConfirmationInput }
      } & ExternalBookingConfirmationSelection,
      DeepRequired<ExternalBookingConfirmation>
    >("mutation", "addBookingConfirmation"),
    addBookingCodes: apiEndpoint<
      {
        __args: {
          confirmationId: number
          variables: BookingCodeVariable[]
          instructions: BookingCodeTemplate[]
        }
      },
      DeepRequired<string>
    >("mutation", "addBookingCodes"),
    requestBookingReport: apiEndpoint<
      { __args: { from: IDate; to: IDate; sorting: BookingSorting } },
      DeepRequired<string>
    >("mutation", "requestBookingReport"),
    requestReviewsReport: apiEndpoint<
      { __args: { from: IDate; to: IDate } },
      DeepRequired<string>
    >("mutation", "requestReviewsReport"),
    updateBookingCustomFieldValues: apiEndpoint<
      {
        __args: { bookingId: UUID; fieldValues: CustomFieldValueUpdateInput[] }
      },
      DeepRequired<boolean>
    >("mutation", "updateBookingCustomFieldValues"),
    resendCheckInInstructions: apiEndpoint<
      { __args: { bookingId: UUID; force?: boolean; email?: string } },
      DeepRequired<boolean>
    >("mutation", "resendCheckInInstructions"),
    saveWifiRegistration: apiEndpoint<
      { __args: { input: WifiRegistrationInput } },
      DeepRequired<string>
    >("mutation", "saveWifiRegistration"),
    resendDocumentRequest: apiEndpoint<
      { __args: { bookingId: UUID } },
      DeepRequired<boolean>
    >("mutation", "resendDocumentRequest"),
    createBookingQuote: apiEndpoint<
      {
        __args: { bookingRequest: BookingQuoteRequest }
      } & BookingQuoteSelection,
      DeepRequired<BookingQuote>
    >("mutation", "createBookingQuote"),
    createMarriottBooking: apiEndpoint<
      {
        __args: { bookingRequest: BookingRequest; contact: NewContactDetails }
      },
      DeepRequired<UUID>
    >("mutation", "createMarriottBooking"),
    requestContact: apiEndpoint<
      { __args: { request: ContactRequestInput } },
      DeepRequired<string>
    >("mutation", "requestContact"),
    requestPartnership: apiEndpoint<
      { __args: { request: PartnershipRequestInput } },
      DeepRequired<string>
    >("mutation", "requestPartnership"),
    requestRetreatProposal: apiEndpoint<
      { __args: { content: string } },
      DeepRequired<string>
    >("mutation", "requestRetreatProposal"),
    updateCustomFieldSections: apiEndpoint<
      {
        __args: { sections: CustomFieldSectionInput[] }
      } & ExtendedCustomFieldSectionSelection,
      DeepRequired<ExtendedCustomFieldSection[]>
    >("mutation", "updateCustomFieldSections"),
    updateCustomFields: apiEndpoint<
      {
        __args: { customFields: CustomFieldInput[] }
      } & ExtendedCustomFieldSelection,
      DeepRequired<ExtendedCustomField[]>
    >("mutation", "updateCustomFields"),
    createCoupon: apiEndpoint<
      {
        __args: {
          code: string
          description?: string
          salesFrom?: IDate
          salesTo?: IDate
          bookingPeriod: CouponBookingPeriodType
          bookingFrom: IDate
          bookingTo: IDate
          applicableTo: CouponHomeApplicableTo
          kind: CouponKind
          properties?: UUID[]
          availableForHighSeason?: boolean
          maximumUsages?: number
          minimumPrice?: number
          discountType: DiscountKind
          discountValue: number
        }
      },
      DeepRequired<boolean>
    >("mutation", "createCoupon"),
    updateStreamlineCoupons: apiEndpoint<undefined, DeepRequired<boolean>>(
      "mutation",
      "updateStreamlineCoupons"
    ),
    enableCoupon: apiEndpoint<
      { __args: { code: string } },
      DeepRequired<boolean>
    >("mutation", "enableCoupon"),
    disableCoupon: apiEndpoint<
      { __args: { code: string } },
      DeepRequired<boolean>
    >("mutation", "disableCoupon"),
    updateCoupon: apiEndpoint<
      { __args: { input: CouponUpdateInput; newCode?: string } },
      DeepRequired<boolean>
    >("mutation", "updateCoupon"),
    updateStreamlineCoupon: apiEndpoint<
      { __args: { input: StreamlineCoupon } },
      DeepRequired<boolean>
    >("mutation", "updateStreamlineCoupon"),
    backOfficeUser: apiEndpoint<
      BackOfficeUserMutationsSelection,
      DeepRequired<BackOfficeUserMutations>
    >("mutation", "backOfficeUser"),
    addToBlacklist: apiEndpoint<
      { __args: { email: string } },
      DeepRequired<boolean>
    >("mutation", "addToBlacklist"),
    addCreditCardToBlacklist: apiEndpoint<
      { __args: { number: string } },
      DeepRequired<boolean>
    >("mutation", "addCreditCardToBlacklist"),
    removeCreditCardFromBlacklist: apiEndpoint<
      { __args: { number: string } },
      DeepRequired<boolean>
    >("mutation", "removeCreditCardFromBlacklist"),
    deleteFromBlacklist: apiEndpoint<
      { __args: { email: string } },
      DeepRequired<boolean>
    >("mutation", "deleteFromBlacklist")
  }
}

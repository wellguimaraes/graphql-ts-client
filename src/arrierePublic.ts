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

export enum ClientType {
  mobile = "MOBILE",
  other = "OTHER",
  web = "WEB"
}

export enum DocumentKind {
  id = "ID",
  other = "OTHER"
}

export enum BathroomKind {
  noBath = "NO_BATH",
  indoorOutdoorShower = "INDOOR_OUTDOOR_SHOWER",
  sharedBath = "SHARED_BATH",
  fullBath = "FULL_BATH",
  halfBath = "HALF_BATH"
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
  waitingForApproval = "WAITING_FOR_APPROVAL",
  requested = "REQUESTED",
  rejected = "REJECTED",
  accepted = "ACCEPTED",
  ignored = "IGNORED"
}

export enum BookingStatus {
  booked = "BOOKED",
  requested = "REQUESTED",
  cancelled = "CANCELLED",
  noShow = "NO_SHOW",
  checkedOut = "CHECKED_OUT",
  quoted = "QUOTED",
  checkedIn = "CHECKED_IN",
  modified = "MODIFIED"
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

export enum HomeDateOccupancyStatus {
  checkOut = "CHECK_OUT",
  checkIn = "CHECK_IN",
  vacant = "VACANT",
  occupied = "OCCUPIED",
  checkOutAndCheckIn = "CHECK_OUT_AND_CHECK_IN"
}

export enum HomeQuerySorting {
  relevance = "RELEVANCE",
  priceDesc = "PRICE_DESC",
  regionName = "REGION_NAME",
  homeName = "HOME_NAME",
  priceAsc = "PRICE_ASC"
}

export enum HowDidYouHearAboutUs {
  other = "OTHER",
  familyOrFriend = "FAMILY_OR_FRIEND",
  thirdPartyPlatform = "THIRD_PARTY_PLATFORM",
  searchEngine = "SEARCH_ENGINE",
  socialMedia = "SOCIAL_MEDIA"
}

export enum PaymentStatus {
  succeed = "SUCCEED",
  cancelled = "CANCELLED",
  pending = "PENDING"
}

export enum RoomKind {
  bedroom = "BEDROOM",
  livingSleepingCombo = "LIVING_SLEEPING_COMBO",
  otherSleepingArea = "OTHER_SLEEPING_AREA"
}

export interface BookingChangeRequestInput {
  bookingHash: string
  newDate: IDate
  kind: BookingChangeRequestKind
}

export interface BookingGuestMutations {
  addGuestPayments: boolean
  createPaymentIntent: string
  addGuest: BookingGuest
  removeGuest: boolean
  changeGuestRoom: boolean
}

export interface CancelBookingInput {
  bookingId: UUID
  expectedCancellationFee: number
  reason: string
}

export interface ContactRequestInput {
  name: string
  email: string
  message: string
}

export interface DocumentRequest {
  description: string
  documentKind: DocumentKind
  extension: string
  size: number
}

export interface DocumentUploadInfo {
  documentId: UUID
  url: string
}

export interface GuestCreateInput {
  fullName: string
  email: string
  password: string
  termsId: string
}

export interface GuestPaymentInput {
  personId: UUID
  amount: number
}

export interface GuestUpdateInput {
  fullName?: string
  phone?: string
  email?: string
  address?: string
  zipCode?: string
  city?: string
  state?: string
  countryCode?: string
}

export interface IntentResult {
  id: string
  clientSecret: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
}

export interface Mutation {
  isEmailAlreadyInUse: boolean
  createGuest: User
  updateGuest: boolean
  confirmEmail: boolean
  resendVerificationEmail: boolean
  updatePassword: boolean
  login: LoginResponse
  refreshToken: LoginResponse
  loginBySms: LoginResponse
  validatePhone: LoginResponse
  createNewUser: LoginResponse
  sendSmsVerificationCode: string
  requestPhoneVerificationCode: boolean
  requestPasswordReset: boolean
  resetPassword: boolean
  addPushToken: string
  subscribeToMailingList: string
  requestBooking: UUID
  addPaymentInformation: boolean
  attachDocument: boolean
  cancelBooking: number
  addMyBookingGuest: string
  addBookingChangeRequest: string
  bookingGuests: BookingGuestMutations
  requestContact: string
  requestPartnership: string
  requestRetreatProposal: string
  createDocument: DocumentUploadInfo
  trackEvent: boolean
  calculateYourRevenue: RentalizerReport
  createIntent: IntentResult
}

export interface NewAddress {
  address: string
  zipCode: string
  city: string
  state?: string
  countryCode: string
}

export interface NewContactDetails {
  fullName: string
  email: string
  phone: string
}

export interface PartnershipRequestInput {
  name: string
  email: string
  phone: string
  city: string
  message: string
}

export interface RentalizerReport {
  ltmRevenueLower: number
  ltmRevenueUpper: number
  ltmOccupancy: number
}

export interface ResetPasswordInput {
  code: string
  newPassword: string
}

export interface UpdatePasswordInput {
  currentPassword: string
  newPassword: string
}

export interface Address {
  address?: string
  zipCode?: string
  city?: string
  countryCode?: string
  state?: State
  region?: Region
}

export interface Amenity {
  id: UUID
  name: string
  quantity?: number
}

export interface Asset {
  id: UUID
  extension?: string
  size?: number
  fileName?: string
  url: string
}

export interface Bathroom {
  id: UUID
  listOrder: number
  name: string
  kind: BathroomKind
  amenities: Amenity[]
}

export interface Booking {
  id: UUID
  hash: string
  guestName: string
  period: DateRange
  guests: number
  pets: number
  status: BookingStatus
  heardAboutUs: HowDidYouHearAboutUs
  createdAt: IDate
  confirmationId?: number
  reservationId?: number
  aboutUsDetails?: string
  numberOfNights: number
  totalValue: number
  pricing: BookingRequestPrice
  taxesAndFees: BookingFee[]
  paidValue: number
  showDetailedInfo: boolean
  checkIn: IDate
  checkOut: IDate
  checkInDates: BookingDates
  checkOutDates: BookingDates
  changeRequests: BookingChangeRequest[]
  codes: BookingCodeInstruction[]
  entryInstructions: BookingCodeInstruction[]
  accessInstructions: BookingCodeInstruction[]
  cancellationInfo: BookingCancellationInfo
  latitude?: number
  longitude?: number
  guestList: BookingGuest[]
  address: Address
  home: Home
}

export interface BookingCancellationInfo {
  canBeCancelled: boolean
  cancellationFee: number
  refund: number
}

export interface BookingChangeRequest {
  id: UUID
  oldDate: IDate
  newDate: IDate
  kind: BookingChangeRequestKind
  status: BookingChangeRequestStatus
  reviewedAt?: IDate
  reviewedBy?: string
  reprovedReason?: string
  slackNotificationTs?: string
  createdAt: IDate
}

export interface BookingCodeInstruction {
  title: string
  contents: string
}

export interface BookingDates {
  endpoint: IDate
  maxFreeEndpointExtension?: IDate
  autoCheckDate: IDate
  freeCheckDate?: IDate
}

export interface BookingFee {
  name: string
  feeKind: FeeKind
  amount: number
}

export interface BookingGuest {
  personId: UUID
  name: string
  email?: string
  phone?: string
  roomId?: UUID
  createdAt: IDate
  updatedAt?: IDate
  payment?: BookingPayment
}

export interface BookingPayment {
  amount: number
  reserve: boolean
  status: PaymentStatus
  link: string
}

export interface BookingRate {
  date: IDate
  price: number
  extra: number
  discount: number
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

export interface BookingRequestPrice {
  grossTotal: number
  discount: number
  total: number
  dueToday: number
  nights: BookingRate[]
}

export interface Country {
  id: string
  name: string
}

export interface Coupon {
  code: string
  validFrom?: IDate
  validUntil?: IDate
  checkInFrom: IDate
  checkInUntil: IDate
  availableForHighSeason: boolean
  isValidFor: boolean
  validForHomes: UUID[]
}

export interface CreditCardDetails {
  ccType: CreditCardType
  nameOnCard: string
  number: string
  cid: string
  expirationDate: IDate
}

export interface DateRange {
  start: IDate
  end: IDate
}

export interface DateRangeInput {
  start: IDate
  end: IDate
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

export interface ExperienceDistance {
  experience: Experience
  distance: string
}

export interface ExperienceDistanceResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: ExperienceDistance[]
}

export interface ExtraField {
  kind: CustomFieldKind
  name: string
  value: string
}

export interface HeardAboutUsInput {
  source: HowDidYouHearAboutUs
  other?: string
}

export interface Home {
  id: UUID
  name: string
  title: string
  keywords: string[]
  maxAdults: number
  maxOccupancy: number
  maxPets: number
  area: string
  virtual: boolean
  listed: boolean
  normalizedName: string
  roomsCount: number
  bathroomsCount: string
  bedsCount: number
  floorsCount: number
  hash?: string
  description: string
  calendar: HomeDateStatus[]
  thumbnail?: string
  region?: Region
  state?: State
  price?: HomePriceView
  city?: string
  rooms: Room[]
  bathrooms: Bathroom[]
  amenities: HomeAmenity[]
  images: Image[]
  strPermit?: string
  book: HomeBook
  customFields: ExtraField[]
  latitude?: number
  longitude?: number
  experiences: ExperienceDistanceResultsPage
  address?: Address
}

export interface HomeAmenity {
  quantity?: number
  comment?: string
  name: string
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

export interface HomeDateStatus {
  date: IDate
  minStay?: number
  season?: string
  rate?: number
  status: HomeDateOccupancyStatus
}

export interface HomePriceDateView {
  date: IDate
  rate: number
  minStay: number
}

export interface HomePriceView {
  totalPrice?: number
  minNightlyPrice?: number
  nightlyPrices: HomePriceDateView[]
}

export interface HomeResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Home[]
}

export interface Image {
  listOrder: number
  url: string
  description?: string
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
}

export interface PreBookingResponse {
  taxesAndFees: BookingFee[]
  pricing: BookingRequestPrice
}

export interface PrivacyPolicy {
  id: string
  markdown: string
}

export interface Query {
  user?: User
  homesById: Home[]
  homes: Home[]
  homeSearch: HomeResultsPage
  countries: Country[]
  states: State[]
  cities: string[]
  regions: RegionResultsPage
  termsAndConditions: TermsAndCondition
  privacyPolicy: PrivacyPolicy
  booking?: Booking
  bookings: Booking[]
  canAttachDocument: boolean
  preBookingPrice: PreBookingResponse
  coupon?: Coupon
}

export interface Region {
  id: UUID
  name: string
  timezone: string
  active: boolean
  photoUrl: string
  homeCount: number
}

export interface RegionResultsPage {
  total?: number
  pages?: number
  paginationParams: Pagination
  results: Region[]
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
  sleepingPlaces: RoomAmenity[]
  roomAmenities: RoomAmenity[]
  bathroomAmenities: RoomAmenity[]
  thumbnail?: Asset
  images: Image[]
  amenities: Amenity[]
}

export interface RoomAmenity {
  amenityId: UUID
  quantity: number
  name: string
}

export interface State {
  id: UUID
  name: string
  code: string
  countryCode: string
}

export interface TermsAndCondition {
  id: string
  markdown: string
}

export interface User {
  id: UUID
  guestId: UUID
  email?: string
  emailConfirmed: boolean
  active: boolean
  termId?: string
  createdAt: IDate
  updatedAt: IDate
  person: Person
  phone?: string
  documentVerified: boolean
}

export interface BookingChangeRequestInputSelection {
  bookingHash?: boolean
  newDate?: boolean
  kind?: boolean
}

export interface BookingGuestMutationsSelection {
  addGuestPayments?: {
    __args: { bookingId: UUID; payments: GuestPaymentInput[] }
  }
  createPaymentIntent?: { __args: { bookingId: UUID; personId: UUID } }
  addGuest?: {
    __args: {
      bookingId: UUID
      name: string
      email?: string
      phone?: string
      room?: UUID
    }
  } & BookingGuestSelection
  removeGuest?: { __args: { bookingId: UUID; email?: string; phone?: string } }
  changeGuestRoom?: {
    __args: { bookingId: UUID; email?: string; phone?: string; room: UUID }
  }
}

export interface CancelBookingInputSelection {
  bookingId?: boolean
  expectedCancellationFee?: boolean
  reason?: boolean
}

export interface ContactRequestInputSelection {
  name?: boolean
  email?: boolean
  message?: boolean
}

export interface DocumentRequestSelection {
  description?: boolean
  documentKind?: boolean
  extension?: boolean
  size?: boolean
}

export interface DocumentUploadInfoSelection {
  documentId?: boolean
  url?: boolean
}

export interface GuestCreateInputSelection {
  fullName?: boolean
  email?: boolean
  password?: boolean
  termsId?: boolean
}

export interface GuestPaymentInputSelection {
  personId?: boolean
  amount?: boolean
}

export interface GuestUpdateInputSelection {
  fullName?: boolean
  phone?: boolean
  email?: boolean
  address?: boolean
  zipCode?: boolean
  city?: boolean
  state?: boolean
  countryCode?: boolean
}

export interface IntentResultSelection {
  id?: boolean
  clientSecret?: boolean
}

export interface LoginResponseSelection {
  token?: boolean
  refreshToken?: boolean
}

export interface MutationSelection {
  isEmailAlreadyInUse?: { __args: { email: string } }
  createGuest?: {
    __args: { guestCreateInput: GuestCreateInput }
  } & UserSelection
  updateGuest?: { __args: { input: GuestUpdateInput } }
  confirmEmail?: { __args: { confirmationCode: string } }
  resendVerificationEmail?: boolean
  updatePassword?: { __args: { updatePassword: UpdatePasswordInput } }
  login?: {
    __args: { email: string; password: string; clientType: ClientType }
  } & LoginResponseSelection
  refreshToken?: { __args: { refreshToken: string } } & LoginResponseSelection
  loginBySms?: {
    __args: { phone: string; verificationCode: number }
  } & LoginResponseSelection
  validatePhone?: {
    __args: { phone: string; verificationCode: number }
  } & LoginResponseSelection
  createNewUser?: {
    __args: {
      phone: string
      verificationCode: number
      email: string
      name: string
    }
  } & LoginResponseSelection
  sendSmsVerificationCode?: { __args: { phone: string } }
  requestPhoneVerificationCode?: { __args: { phone: string } }
  requestPasswordReset?: { __args: { email: string } }
  resetPassword?: { __args: { resetPassword: ResetPasswordInput } }
  addPushToken?: { __args: { pushToken: string } }
  subscribeToMailingList?: { __args: { firstName: string; email: string } }
  requestBooking?: {
    __args: {
      booking: BookingRequest
      contact?: NewContactDetails
      billingAddress?: NewAddress
      documentId?: UUID
    }
  }
  addPaymentInformation?: {
    __args: {
      bookingId: UUID
      documentId: UUID
      contactInformation?: NewContactDetails
      creditCard: CreditCardDetails
      billingAddress: NewAddress
      notes?: string
    }
  }
  attachDocument?: { __args: { token: string; documentId: UUID } }
  cancelBooking?: { __args: { cancelBookingInput: CancelBookingInput } }
  addMyBookingGuest?: { __args: { bookingHash: string } }
  addBookingChangeRequest?: {
    __args: { changeRequestInput: BookingChangeRequestInput }
  }
  bookingGuests?: BookingGuestMutationsSelection
  requestContact?: { __args: { request: ContactRequestInput } }
  requestPartnership?: { __args: { request: PartnershipRequestInput } }
  requestRetreatProposal?: { __args: { content: string } }
  createDocument?: {
    __args: { documentRequest: DocumentRequest }
  } & DocumentUploadInfoSelection
  trackEvent?: {
    __args: {
      personId?: UUID
      bookingId?: UUID
      action: string
      metadata: string
    }
  }
  calculateYourRevenue?: {
    __args: {
      name: string
      email: string
      phone?: string
      address: string
      bedrooms: number
      bathrooms: string
      accommodates: number
    }
  } & RentalizerReportSelection
  createIntent?: { __args: { amount: number } } & IntentResultSelection
}

export interface NewAddressSelection {
  address?: boolean
  zipCode?: boolean
  city?: boolean
  state?: boolean
  countryCode?: boolean
}

export interface NewContactDetailsSelection {
  fullName?: boolean
  email?: boolean
  phone?: boolean
}

export interface PartnershipRequestInputSelection {
  name?: boolean
  email?: boolean
  phone?: boolean
  city?: boolean
  message?: boolean
}

export interface RentalizerReportSelection {
  ltmRevenueLower?: boolean
  ltmRevenueUpper?: boolean
  ltmOccupancy?: boolean
}

export interface ResetPasswordInputSelection {
  code?: boolean
  newPassword?: boolean
}

export interface UpdatePasswordInputSelection {
  currentPassword?: boolean
  newPassword?: boolean
}

export interface AddressSelection {
  address?: boolean
  zipCode?: boolean
  city?: boolean
  countryCode?: boolean
  state?: StateSelection
  region?: RegionSelection
}

export interface AmenitySelection {
  id?: boolean
  name?: boolean
  quantity?: boolean
}

export interface AssetSelection {
  id?: boolean
  extension?: boolean
  size?: boolean
  fileName?: boolean
  url?: boolean
}

export interface BathroomSelection {
  id?: boolean
  listOrder?: boolean
  name?: boolean
  kind?: boolean
  amenities?: AmenitySelection
}

export interface BookingSelection {
  id?: boolean
  hash?: boolean
  guestName?: boolean
  period?: DateRangeSelection
  guests?: boolean
  pets?: boolean
  status?: boolean
  heardAboutUs?: boolean
  createdAt?: boolean
  confirmationId?: boolean
  reservationId?: boolean
  aboutUsDetails?: boolean
  numberOfNights?: boolean
  totalValue?: boolean
  pricing?: BookingRequestPriceSelection
  taxesAndFees?: BookingFeeSelection
  paidValue?: boolean
  showDetailedInfo?: boolean
  checkIn?: boolean
  checkOut?: boolean
  checkInDates?: BookingDatesSelection
  checkOutDates?: BookingDatesSelection
  changeRequests?: BookingChangeRequestSelection
  codes?: BookingCodeInstructionSelection
  entryInstructions?: BookingCodeInstructionSelection
  accessInstructions?: BookingCodeInstructionSelection
  cancellationInfo?: BookingCancellationInfoSelection
  latitude?: boolean
  longitude?: boolean
  guestList?: BookingGuestSelection
  address?: AddressSelection
  home?: HomeSelection
}

export interface BookingCancellationInfoSelection {
  canBeCancelled?: boolean
  cancellationFee?: boolean
  refund?: boolean
}

export interface BookingChangeRequestSelection {
  id?: boolean
  oldDate?: boolean
  newDate?: boolean
  kind?: boolean
  status?: boolean
  reviewedAt?: boolean
  reviewedBy?: boolean
  reprovedReason?: boolean
  slackNotificationTs?: boolean
  createdAt?: boolean
}

export interface BookingCodeInstructionSelection {
  title?: boolean
  contents?: boolean
}

export interface BookingDatesSelection {
  endpoint?: boolean
  maxFreeEndpointExtension?: boolean
  autoCheckDate?: boolean
  freeCheckDate?: boolean
}

export interface BookingFeeSelection {
  name?: boolean
  feeKind?: boolean
  amount?: boolean
}

export interface BookingGuestSelection {
  personId?: boolean
  name?: boolean
  email?: boolean
  phone?: boolean
  roomId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  payment?: BookingPaymentSelection
}

export interface BookingPaymentSelection {
  amount?: boolean
  reserve?: boolean
  status?: boolean
  link?: boolean
}

export interface BookingRateSelection {
  date?: boolean
  price?: boolean
  extra?: boolean
  discount?: boolean
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

export interface BookingRequestPriceSelection {
  grossTotal?: boolean
  discount?: boolean
  total?: boolean
  dueToday?: boolean
  nights?: BookingRateSelection
}

export interface CountrySelection {
  id?: boolean
  name?: boolean
}

export interface CouponSelection {
  code?: boolean
  validFrom?: boolean
  validUntil?: boolean
  checkInFrom?: boolean
  checkInUntil?: boolean
  availableForHighSeason?: boolean
  isValidFor?: { __args: { checkIn: IDate; checkOut: IDate; homeId?: UUID } }
  validForHomes?: { __args: { checkIn: IDate; checkOut: IDate } }
}

export interface CreditCardDetailsSelection {
  ccType?: boolean
  nameOnCard?: boolean
  number?: boolean
  cid?: boolean
  expirationDate?: boolean
}

export interface DateRangeSelection {
  start?: boolean
  end?: boolean
}

export interface DateRangeInputSelection {
  start?: boolean
  end?: boolean
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

export interface ExperienceDistanceSelection {
  experience?: ExperienceSelection
  distance?: boolean
}

export interface ExperienceDistanceResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: ExperienceDistanceSelection
}

export interface ExtraFieldSelection {
  kind?: boolean
  name?: boolean
  value?: boolean
}

export interface HeardAboutUsInputSelection {
  source?: boolean
  other?: boolean
}

export interface HomeSelection {
  id?: boolean
  name?: boolean
  title?: boolean
  keywords?: boolean
  maxAdults?: boolean
  maxOccupancy?: boolean
  maxPets?: boolean
  area?: boolean
  virtual?: boolean
  listed?: boolean
  normalizedName?: boolean
  roomsCount?: boolean
  bathroomsCount?: boolean
  bedsCount?: boolean
  floorsCount?: boolean
  hash?: boolean
  description?: boolean
  calendar?: { __args: { from: IDate; to: IDate } } & HomeDateStatusSelection
  thumbnail?: boolean
  region?: RegionSelection
  state?: StateSelection
  price?: { __args: { period: DateRangeInput } } & HomePriceViewSelection
  city?: boolean
  rooms?: RoomSelection
  bathrooms?: BathroomSelection
  amenities?: HomeAmenitySelection
  images?: ImageSelection
  strPermit?: boolean
  book?: { __args: { kind: BookKind } } & HomeBookSelection
  customFields?: ExtraFieldSelection
  latitude?: boolean
  longitude?: boolean
  experiences?: {
    __args: {
      maxDistance: string
      period?: DateRangeInput
      experienceKindName: ExperienceKindName
      pagination?: PaginationInput
    }
  } & ExperienceDistanceResultsPageSelection
  address?: AddressSelection
}

export interface HomeAmenitySelection {
  quantity?: boolean
  comment?: boolean
  name?: boolean
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

export interface HomeDateStatusSelection {
  date?: boolean
  minStay?: boolean
  season?: boolean
  rate?: boolean
  status?: boolean
}

export interface HomePriceDateViewSelection {
  date?: boolean
  rate?: boolean
  minStay?: boolean
}

export interface HomePriceViewSelection {
  totalPrice?: boolean
  minNightlyPrice?: boolean
  nightlyPrices?: HomePriceDateViewSelection
}

export interface HomeResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: HomeSelection
}

export interface ImageSelection {
  listOrder?: boolean
  url?: boolean
  description?: boolean
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
}

export interface PreBookingResponseSelection {
  taxesAndFees?: BookingFeeSelection
  pricing?: BookingRequestPriceSelection
}

export interface PrivacyPolicySelection {
  id?: boolean
  markdown?: boolean
}

export interface QuerySelection {
  user?: UserSelection
  homesById?: { __args: { homeIds: string[] } } & HomeSelection
  homes?: { __args: { homeId: UUID } } & HomeSelection
  homeSearch?: {
    __args: {
      regionId?: UUID
      terms?: string
      checkIn?: IDate
      checkOut?: IDate
      minPrice?: number
      maxPrice?: number
      minOccupancy?: number
      minPets?: number
      sort: HomeQuerySorting
      pagination?: PaginationInput
    }
  } & HomeResultsPageSelection
  countries?: CountrySelection
  states?: { __args: { countryId?: string } } & StateSelection
  cities?: boolean
  regions?: {
    __args: { featuredOnly?: boolean; pagination?: PaginationInput }
  } & RegionResultsPageSelection
  termsAndConditions?: TermsAndConditionSelection
  privacyPolicy?: PrivacyPolicySelection
  booking?: {
    __args: { bookingId?: UUID; bookingHash?: string }
  } & BookingSelection
  bookings?: { __args: { bookingHash?: string } } & BookingSelection
  canAttachDocument?: { __args: { token: string } }
  preBookingPrice?: {
    __args: { bookingRequest: BookingRequest }
  } & PreBookingResponseSelection
  coupon?: { __args: { code: string } } & CouponSelection
}

export interface RegionSelection {
  id?: boolean
  name?: boolean
  timezone?: boolean
  active?: boolean
  photoUrl?: boolean
  homeCount?: boolean
}

export interface RegionResultsPageSelection {
  total?: boolean
  pages?: boolean
  paginationParams?: PaginationSelection
  results?: RegionSelection
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
  sleepingPlaces?: RoomAmenitySelection
  roomAmenities?: RoomAmenitySelection
  bathroomAmenities?: RoomAmenitySelection
  thumbnail?: AssetSelection
  images?: ImageSelection
  amenities?: AmenitySelection
}

export interface RoomAmenitySelection {
  amenityId?: boolean
  quantity?: boolean
  name?: boolean
}

export interface StateSelection {
  id?: boolean
  name?: boolean
  code?: boolean
  countryCode?: boolean
}

export interface TermsAndConditionSelection {
  id?: boolean
  markdown?: boolean
}

export interface UserSelection {
  id?: boolean
  guestId?: boolean
  email?: boolean
  emailConfirmed?: boolean
  active?: boolean
  termId?: boolean
  createdAt?: boolean
  updatedAt?: boolean
  person?: PersonSelection
  phone?: boolean
  documentVerified?: boolean
}

const typesTree = {
  BookingGuestMutations: {
    get addGuestPayments(): any {
      return {
        __args: {
          bookingId: "UUID!",
          payments: "[GuestPaymentInput!]!"
        }
      }
    },

    get createPaymentIntent(): any {
      return {
        __args: {
          bookingId: "UUID!",
          personId: "UUID!"
        }
      }
    },

    get addGuest(): any {
      return {
        __args: {
          bookingId: "UUID!",
          name: "String!",
          email: "String",
          phone: "String",
          room: "UUID"
        }
      }
    },

    get removeGuest(): any {
      return {
        __args: {
          bookingId: "UUID!",
          email: "String",
          phone: "String"
        }
      }
    },

    get changeGuestRoom(): any {
      return {
        __args: {
          bookingId: "UUID!",
          email: "String",
          phone: "String",
          room: "UUID!"
        }
      }
    }
  },

  Mutation: {
    get isEmailAlreadyInUse(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get createGuest(): any {
      return {
        __args: {
          guestCreateInput: "GuestCreateInput!"
        }
      }
    },

    get updateGuest(): any {
      return {
        __args: {
          input: "GuestUpdateInput!"
        }
      }
    },

    get confirmEmail(): any {
      return {
        __args: {
          confirmationCode: "String!"
        }
      }
    },

    get updatePassword(): any {
      return {
        __args: {
          updatePassword: "UpdatePasswordInput!"
        }
      }
    },

    get login(): any {
      return {
        __args: {
          email: "String!",
          password: "String!",
          clientType: "ClientType"
        }
      }
    },

    get refreshToken(): any {
      return {
        __args: {
          refreshToken: "String!"
        }
      }
    },

    get loginBySms(): any {
      return {
        __args: {
          phone: "String!",
          verificationCode: "Int!"
        }
      }
    },

    get validatePhone(): any {
      return {
        __args: {
          phone: "String!",
          verificationCode: "Int!"
        }
      }
    },

    get createNewUser(): any {
      return {
        __args: {
          phone: "String!",
          verificationCode: "Int!",
          email: "String!",
          name: "String!"
        }
      }
    },

    get sendSmsVerificationCode(): any {
      return {
        __args: {
          phone: "String!"
        }
      }
    },

    get requestPhoneVerificationCode(): any {
      return {
        __args: {
          phone: "String!"
        }
      }
    },

    get requestPasswordReset(): any {
      return {
        __args: {
          email: "String!"
        }
      }
    },

    get resetPassword(): any {
      return {
        __args: {
          resetPassword: "ResetPasswordInput!"
        }
      }
    },

    get addPushToken(): any {
      return {
        __args: {
          pushToken: "String!"
        }
      }
    },

    get subscribeToMailingList(): any {
      return {
        __args: {
          firstName: "String!",
          email: "String!"
        }
      }
    },

    get requestBooking(): any {
      return {
        __args: {
          booking: "BookingRequest!",
          contact: "NewContactDetails",
          billingAddress: "NewAddress",
          documentId: "UUID"
        }
      }
    },

    get addPaymentInformation(): any {
      return {
        __args: {
          bookingId: "UUID!",
          documentId: "UUID!",
          contactInformation: "NewContactDetails",
          creditCard: "CreditCardDetails!",
          billingAddress: "NewAddress!",
          notes: "String"
        }
      }
    },

    get attachDocument(): any {
      return {
        __args: {
          token: "String!",
          documentId: "UUID!"
        }
      }
    },

    get cancelBooking(): any {
      return {
        __args: {
          cancelBookingInput: "CancelBookingInput!"
        }
      }
    },

    get addMyBookingGuest(): any {
      return {
        __args: {
          bookingHash: "String!"
        }
      }
    },

    get addBookingChangeRequest(): any {
      return {
        __args: {
          changeRequestInput: "BookingChangeRequestInput!"
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

    get createDocument(): any {
      return {
        __args: {
          documentRequest: "DocumentRequest!"
        }
      }
    },

    get trackEvent(): any {
      return {
        __args: {
          personId: "UUID",
          bookingId: "UUID",
          action: "String!",
          metadata: "Json!"
        }
      }
    },

    get calculateYourRevenue(): any {
      return {
        __args: {
          name: "String!",
          email: "String!",
          phone: "String",
          address: "String!",
          bedrooms: "Int!",
          bathrooms: "Float!",
          accommodates: "Int!"
        }
      }
    },

    get createIntent(): any {
      return {
        __args: {
          amount: "BigDecimal!"
        }
      }
    },

    get bookingGuests(): any {
      return {
        __fields: typesTree.BookingGuestMutations
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

  Home: {
    get calendar(): any {
      return {
        __args: {
          from: "LocalDate!",
          to: "LocalDate!"
        }
      }
    },

    get price(): any {
      return {
        __args: {
          period: "DateRangeInput!"
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

    get experiences(): any {
      return {
        __args: {
          maxDistance: "Float!",
          period: "DateRangeInput",
          experienceKindName: "ExperienceKindName",
          pagination: "PaginationInput"
        }
      }
    }
  },

  Query: {
    get homesById(): any {
      return {
        __args: {
          homeIds: "[String!]!"
        }
      }
    },

    get homes(): any {
      return {
        __args: {
          homeId: "UUID!"
        }
      }
    },

    get homeSearch(): any {
      return {
        __args: {
          regionId: "UUID",
          terms: "String",
          checkIn: "LocalDate",
          checkOut: "LocalDate",
          minPrice: "BigDecimal",
          maxPrice: "BigDecimal",
          minOccupancy: "Int",
          minPets: "Int",
          sort: "HomeQuerySorting",
          pagination: "PaginationInput"
        }
      }
    },

    get states(): any {
      return {
        __args: {
          countryId: "String"
        }
      }
    },

    get regions(): any {
      return {
        __args: {
          featuredOnly: "Boolean",
          pagination: "PaginationInput"
        }
      }
    },

    get booking(): any {
      return {
        __fields: typesTree.Booking,

        __args: {
          bookingId: "UUID",
          bookingHash: "String"
        }
      }
    },

    get bookings(): any {
      return {
        __args: {
          bookingHash: "String"
        }
      }
    },

    get canAttachDocument(): any {
      return {
        __args: {
          token: "String!"
        }
      }
    },

    get preBookingPrice(): any {
      return {
        __args: {
          bookingRequest: "BookingRequest!"
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
    }
  },

  Booking: {
    get home(): any {
      return {
        __fields: typesTree.Home
      }
    }
  }
}

let _client = new GraphQLClient(
  "https://arriere.stage.avantstay.dev/public/graphql"
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
    user: apiEndpoint<UserSelection, DeepRequired<Maybe<User>>>(
      "query",
      "user"
    ),
    homesById: apiEndpoint<
      { __args: { homeIds: string[] } } & HomeSelection,
      DeepRequired<Home[]>
    >("query", "homesById"),
    homes: apiEndpoint<
      { __args: { homeId: UUID } } & HomeSelection,
      DeepRequired<Home[]>
    >("query", "homes"),
    homeSearch: apiEndpoint<
      {
        __args: {
          regionId?: UUID
          terms?: string
          checkIn?: IDate
          checkOut?: IDate
          minPrice?: number
          maxPrice?: number
          minOccupancy?: number
          minPets?: number
          sort: HomeQuerySorting
          pagination?: PaginationInput
        }
      } & HomeResultsPageSelection,
      DeepRequired<HomeResultsPage>
    >("query", "homeSearch"),
    countries: apiEndpoint<CountrySelection, DeepRequired<Country[]>>(
      "query",
      "countries"
    ),
    states: apiEndpoint<
      { __args: { countryId?: string } } & StateSelection,
      DeepRequired<State[]>
    >("query", "states"),
    cities: apiEndpoint<undefined, DeepRequired<string[]>>("query", "cities"),
    regions: apiEndpoint<
      {
        __args: { featuredOnly?: boolean; pagination?: PaginationInput }
      } & RegionResultsPageSelection,
      DeepRequired<RegionResultsPage>
    >("query", "regions"),
    termsAndConditions: apiEndpoint<
      TermsAndConditionSelection,
      DeepRequired<TermsAndCondition>
    >("query", "termsAndConditions"),
    privacyPolicy: apiEndpoint<
      PrivacyPolicySelection,
      DeepRequired<PrivacyPolicy>
    >("query", "privacyPolicy"),
    booking: apiEndpoint<
      { __args: { bookingId?: UUID; bookingHash?: string } } & BookingSelection,
      DeepRequired<Maybe<Booking>>
    >("query", "booking"),
    bookings: apiEndpoint<
      { __args: { bookingHash?: string } } & BookingSelection,
      DeepRequired<Booking[]>
    >("query", "bookings"),
    canAttachDocument: apiEndpoint<
      { __args: { token: string } },
      DeepRequired<boolean>
    >("query", "canAttachDocument"),
    preBookingPrice: apiEndpoint<
      {
        __args: { bookingRequest: BookingRequest }
      } & PreBookingResponseSelection,
      DeepRequired<PreBookingResponse>
    >("query", "preBookingPrice"),
    coupon: apiEndpoint<
      { __args: { code: string } } & CouponSelection,
      DeepRequired<Maybe<Coupon>>
    >("query", "coupon")
  },
  mutations: {
    isEmailAlreadyInUse: apiEndpoint<
      { __args: { email: string } },
      DeepRequired<boolean>
    >("mutation", "isEmailAlreadyInUse"),
    createGuest: apiEndpoint<
      { __args: { guestCreateInput: GuestCreateInput } } & UserSelection,
      DeepRequired<User>
    >("mutation", "createGuest"),
    updateGuest: apiEndpoint<
      { __args: { input: GuestUpdateInput } },
      DeepRequired<boolean>
    >("mutation", "updateGuest"),
    confirmEmail: apiEndpoint<
      { __args: { confirmationCode: string } },
      DeepRequired<boolean>
    >("mutation", "confirmEmail"),
    resendVerificationEmail: apiEndpoint<undefined, DeepRequired<boolean>>(
      "mutation",
      "resendVerificationEmail"
    ),
    updatePassword: apiEndpoint<
      { __args: { updatePassword: UpdatePasswordInput } },
      DeepRequired<boolean>
    >("mutation", "updatePassword"),
    login: apiEndpoint<
      {
        __args: { email: string; password: string; clientType: ClientType }
      } & LoginResponseSelection,
      DeepRequired<LoginResponse>
    >("mutation", "login"),
    refreshToken: apiEndpoint<
      { __args: { refreshToken: string } } & LoginResponseSelection,
      DeepRequired<LoginResponse>
    >("mutation", "refreshToken"),
    loginBySms: apiEndpoint<
      {
        __args: { phone: string; verificationCode: number }
      } & LoginResponseSelection,
      DeepRequired<LoginResponse>
    >("mutation", "loginBySms"),
    validatePhone: apiEndpoint<
      {
        __args: { phone: string; verificationCode: number }
      } & LoginResponseSelection,
      DeepRequired<LoginResponse>
    >("mutation", "validatePhone"),
    createNewUser: apiEndpoint<
      {
        __args: {
          phone: string
          verificationCode: number
          email: string
          name: string
        }
      } & LoginResponseSelection,
      DeepRequired<LoginResponse>
    >("mutation", "createNewUser"),
    sendSmsVerificationCode: apiEndpoint<
      { __args: { phone: string } },
      DeepRequired<string>
    >("mutation", "sendSmsVerificationCode"),
    requestPhoneVerificationCode: apiEndpoint<
      { __args: { phone: string } },
      DeepRequired<boolean>
    >("mutation", "requestPhoneVerificationCode"),
    requestPasswordReset: apiEndpoint<
      { __args: { email: string } },
      DeepRequired<boolean>
    >("mutation", "requestPasswordReset"),
    resetPassword: apiEndpoint<
      { __args: { resetPassword: ResetPasswordInput } },
      DeepRequired<boolean>
    >("mutation", "resetPassword"),
    addPushToken: apiEndpoint<
      { __args: { pushToken: string } },
      DeepRequired<string>
    >("mutation", "addPushToken"),
    subscribeToMailingList: apiEndpoint<
      { __args: { firstName: string; email: string } },
      DeepRequired<string>
    >("mutation", "subscribeToMailingList"),
    requestBooking: apiEndpoint<
      {
        __args: {
          booking: BookingRequest
          contact?: NewContactDetails
          billingAddress?: NewAddress
          documentId?: UUID
        }
      },
      DeepRequired<UUID>
    >("mutation", "requestBooking"),
    addPaymentInformation: apiEndpoint<
      {
        __args: {
          bookingId: UUID
          documentId: UUID
          contactInformation?: NewContactDetails
          creditCard: CreditCardDetails
          billingAddress: NewAddress
          notes?: string
        }
      },
      DeepRequired<boolean>
    >("mutation", "addPaymentInformation"),
    attachDocument: apiEndpoint<
      { __args: { token: string; documentId: UUID } },
      DeepRequired<boolean>
    >("mutation", "attachDocument"),
    cancelBooking: apiEndpoint<
      { __args: { cancelBookingInput: CancelBookingInput } },
      DeepRequired<number>
    >("mutation", "cancelBooking"),
    addMyBookingGuest: apiEndpoint<
      { __args: { bookingHash: string } },
      DeepRequired<string>
    >("mutation", "addMyBookingGuest"),
    addBookingChangeRequest: apiEndpoint<
      { __args: { changeRequestInput: BookingChangeRequestInput } },
      DeepRequired<string>
    >("mutation", "addBookingChangeRequest"),
    bookingGuests: apiEndpoint<
      BookingGuestMutationsSelection,
      DeepRequired<BookingGuestMutations>
    >("mutation", "bookingGuests"),
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
    createDocument: apiEndpoint<
      {
        __args: { documentRequest: DocumentRequest }
      } & DocumentUploadInfoSelection,
      DeepRequired<DocumentUploadInfo>
    >("mutation", "createDocument"),
    trackEvent: apiEndpoint<
      {
        __args: {
          personId?: UUID
          bookingId?: UUID
          action: string
          metadata: string
        }
      },
      DeepRequired<boolean>
    >("mutation", "trackEvent"),
    calculateYourRevenue: apiEndpoint<
      {
        __args: {
          name: string
          email: string
          phone?: string
          address: string
          bedrooms: number
          bathrooms: string
          accommodates: number
        }
      } & RentalizerReportSelection,
      DeepRequired<RentalizerReport>
    >("mutation", "calculateYourRevenue"),
    createIntent: apiEndpoint<
      { __args: { amount: number } } & IntentResultSelection,
      DeepRequired<IntentResult>
    >("mutation", "createIntent")
  }
}

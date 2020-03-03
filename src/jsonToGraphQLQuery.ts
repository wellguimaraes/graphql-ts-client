const VAR_PREFIX = '@@VAR@@'
const VAR_PREFIX_LENGTH = VAR_PREFIX.length

const typesTree = {
  BookingGuestMutations: {
    get addGuestPayments(): any {
      return {
        __args: {
          bookingId: 'UUID!',
          payments: '[GuestPaymentInput!]!',
        },
      }
    },

    get createPaymentIntent(): any {
      return {
        __args: {
          bookingId: 'UUID!',
          personId: 'UUID!',
        },
      }
    },

    get addGuest(): any {
      return {
        __args: {
          bookingId: 'UUID!',
          name: 'String!',
          email: 'String',
          phone: 'String',
          room: 'UUID',
        },
      }
    },

    get removeGuest(): any {
      return {
        __args: {
          bookingId: 'UUID!',
          email: 'String',
          phone: 'String',
        },
      }
    },

    get changeGuestRoom(): any {
      return {
        __args: {
          bookingId: 'UUID!',
          email: 'String',
          phone: 'String',
          room: 'UUID!',
        },
      }
    },
  },

  Mutation: {
    get isEmailAlreadyInUse(): any {
      return {
        __args: {
          email: 'String!',
        },
      }
    },

    get createGuest(): any {
      return {
        __args: {
          guestCreateInput: 'GuestCreateInput!',
        },
      }
    },

    get updateGuest(): any {
      return {
        __args: {
          input: 'GuestUpdateInput!',
        },
      }
    },

    get confirmEmail(): any {
      return {
        __args: {
          confirmationCode: 'String!',
        },
      }
    },

    get updatePassword(): any {
      return {
        __args: {
          updatePassword: 'UpdatePasswordInput!',
        },
      }
    },

    get login(): any {
      return {
        __args: {
          email: 'String!',
          password: 'String!',
          clientType: 'ClientType',
        },
      }
    },

    get refreshToken(): any {
      return {
        __args: {
          refreshToken: 'String!',
        },
      }
    },

    get loginBySms(): any {
      return {
        __args: {
          phone: 'String!',
          verificationCode: 'Int!',
        },
      }
    },

    get validatePhone(): any {
      return {
        __args: {
          phone: 'String!',
          verificationCode: 'Int!',
        },
      }
    },

    get createNewUser(): any {
      return {
        __args: {
          phone: 'String!',
          verificationCode: 'Int!',
          email: 'String!',
          name: 'String!',
        },
      }
    },

    get sendSmsVerificationCode(): any {
      return {
        __args: {
          phone: 'String!',
        },
      }
    },

    get requestPhoneVerificationCode(): any {
      return {
        __args: {
          phone: 'String!',
        },
      }
    },

    get requestPasswordReset(): any {
      return {
        __args: {
          email: 'String!',
        },
      }
    },

    get resetPassword(): any {
      return {
        __args: {
          resetPassword: 'ResetPasswordInput!',
        },
      }
    },

    get addPushToken(): any {
      return {
        __args: {
          pushToken: 'String!',
        },
      }
    },

    get subscribeToMailingList(): any {
      return {
        __args: {
          firstName: 'String!',
          email: 'String!',
        },
      }
    },

    get requestBooking(): any {
      return {
        __args: {
          booking: 'BookingRequest!',
          contact: 'NewContactDetails',
          billingAddress: 'NewAddress',
          documentId: 'UUID',
        },
      }
    },

    get addPaymentInformation(): any {
      return {
        __args: {
          bookingId: 'UUID!',
          documentId: 'UUID!',
          contactInformation: 'NewContactDetails',
          creditCard: 'CreditCardDetails!',
          billingAddress: 'NewAddress!',
          notes: 'String',
        },
      }
    },

    get attachDocument(): any {
      return {
        __args: {
          token: 'String!',
          documentId: 'UUID!',
        },
      }
    },

    get cancelBooking(): any {
      return {
        __args: {
          cancelBookingInput: 'CancelBookingInput!',
        },
      }
    },

    get addMyBookingGuest(): any {
      return {
        __args: {
          bookingHash: 'String!',
        },
      }
    },

    get addBookingChangeRequest(): any {
      return {
        __args: {
          changeRequestInput: 'BookingChangeRequestInput!',
        },
      }
    },

    get requestContact(): any {
      return {
        __args: {
          request: 'ContactRequestInput!',
        },
      }
    },

    get requestPartnership(): any {
      return {
        __args: {
          request: 'PartnershipRequestInput!',
        },
      }
    },

    get requestRetreatProposal(): any {
      return {
        __args: {
          content: 'String!',
        },
      }
    },

    get createDocument(): any {
      return {
        __args: {
          documentRequest: 'DocumentRequest!',
        },
      }
    },

    get trackEvent(): any {
      return {
        __args: {
          personId: 'UUID',
          bookingId: 'UUID',
          action: 'String!',
          metadata: 'Json!',
        },
      }
    },

    get calculateYourRevenue(): any {
      return {
        __args: {
          name: 'String!',
          email: 'String!',
          phone: 'String',
          address: 'String!',
          bedrooms: 'Int!',
          bathrooms: 'Float!',
          accommodates: 'Int!',
        },
      }
    },

    get createIntent(): any {
      return {
        __args: {
          amount: 'BigDecimal!',
        },
      }
    },

    get bookingGuests(): any {
      return {
        __fields: typesTree.BookingGuestMutations,
      }
    },
  },

  Coupon: {
    get isValidFor(): any {
      return {
        __args: {
          checkIn: 'LocalDate!',
          checkOut: 'LocalDate!',
          homeId: 'UUID',
        },
      }
    },

    get validForHomes(): any {
      return {
        __args: {
          checkIn: 'LocalDate!',
          checkOut: 'LocalDate!',
        },
      }
    },
  },

  Home: {
    get calendar(): any {
      return {
        __args: {
          from: 'LocalDate!',
          to: 'LocalDate!',
        },
      }
    },

    get price(): any {
      return {
        __args: {
          period: 'DateRangeInput!',
        },
      }
    },

    get book(): any {
      return {
        __args: {
          kind: 'BookKind!',
        },
      }
    },

    get experiences(): any {
      return {
        __args: {
          maxDistance: 'Float!',
          period: 'DateRangeInput',
          experienceKindName: 'ExperienceKindName',
          pagination: 'PaginationInput',
        },
      }
    },
  },

  Query: {
    get homesById(): any {
      return {
        __args: {
          homeIds: '[String!]!',
        },
      }
    },

    get homes(): any {
      return {
        __args: {
          homeId: 'UUID!',
        },
      }
    },

    get homeSearch(): any {
      return {
        __args: {
          regionId: 'UUID',
          terms: 'String',
          checkIn: 'LocalDate',
          checkOut: 'LocalDate',
          minPrice: 'BigDecimal',
          maxPrice: 'BigDecimal',
          minOccupancy: 'Int',
          minPets: 'Int',
          sort: 'HomeQuerySorting',
          pagination: 'PaginationInput',
        },
      }
    },

    get states(): any {
      return {
        __args: {
          countryId: 'String',
        },
      }
    },

    get regions(): any {
      return {
        __args: {
          featuredOnly: 'Boolean',
          pagination: 'PaginationInput',
        },
      }
    },

    get booking(): any {
      return {
        __fields: typesTree.Booking,

        __args: {
          bookingId: 'UUID',
          bookingHash: 'String',
        },
      }
    },

    get bookings(): any {
      return {
        __args: {
          bookingHash: 'String',
        },
      }
    },

    get canAttachDocument(): any {
      return {
        __args: {
          token: 'String!',
        },
      }
    },

    get preBookingPrice(): any {
      return {
        __args: {
          bookingRequest: 'BookingRequest!',
        },
      }
    },

    get coupon(): any {
      return {
        __fields: typesTree.Coupon,

        __args: {
          code: 'String!',
        },
      }
    },
  },

  Booking: {
    get home(): any {
      return {
        __fields: typesTree.Home,
      }
    },
  },
}

export function jsonToGraphQLQuery({
  kind,
  name,
  jsonQuery,
  typesTree,
}: {
  kind: 'query' | 'mutation'
  name: string
  jsonQuery: any
  typesTree: any
}) {
  const variablesData = {} as any

  extractVariables({
    jsonQuery: { [name]: jsonQuery },
    variables: variablesData,
    parentType: kind === 'query' ? typesTree.Query : typesTree.Mutation,
  })

  const query = `${kind} ${name}(${Object.entries(variablesData)
    .map(([name, { type }]: any) => `$${name}: ${type}`)
    .join(', ')}) { ${name}${toGraphql(jsonQuery)} }`

  const variables = Object.fromEntries(Object.entries(variablesData).map(([k, v]: any) => [k, v.value]))

  return {
    query,
    variables,
  }
}

function extractVariables({ jsonQuery, variables, parentType }: { jsonQuery: any; variables: any; parentType: any }) {
  if (!parentType) return

  if (jsonQuery.__args) {
    Object.keys(jsonQuery.__args).forEach(k => {
      if (typeof jsonQuery.__args[k] === 'string' && jsonQuery.__args[k].startsWith(VAR_PREFIX)) return

      const variableName = `${k}_${Math.random()
        .toString(36)
        .substr(2, 4)}`

      variables[variableName] = {
        type: parentType.__args[k],
        value: jsonQuery.__args[k],
      }
      jsonQuery.__args[k] = `${VAR_PREFIX}$${variableName}`
    })
  }

  Object.keys(jsonQuery)
    .filter(k => k !== '__args' && typeof jsonQuery[k] === 'object')
    .forEach(k =>
      extractVariables({
        jsonQuery: jsonQuery[k],
        variables,
        parentType: parentType.hasOwnProperty(k) ? parentType[k] : parentType.__fields ? parentType.__fields[k] : undefined,
      })
    )
}

function toGraphql(jsonQuery: any) {
  const fields = Object.entries(jsonQuery)
    .filter(([k, v]) => k !== '__args' && v !== false && v !== undefined)
    .map(([k, v]) => (typeof v === 'object' ? `${k}${toGraphql(v)}` : k))
    .join(' ') as any

  const args = jsonQuery.__args
    ? `(${Object.entries(jsonQuery.__args)
        .map(([k, v]: any) => `${k}:${v.substr(VAR_PREFIX_LENGTH)}`)
        .join(',')})`
    : ''

  return `${args} ${fields ? `{ ${fields} }` : ''}`
}

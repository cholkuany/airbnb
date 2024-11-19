import { IconType } from "react-icons";

import { Reservation, User, Listing } from "@prisma/client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { RangeKeyDict, Range } from "react-date-range";

// TYPES
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

// SAFE TYPES
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
// INTERFACES

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export interface MapProps {
  center?: [number, number];
}

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export type CountrySelectValue = {
  flag: string;
  name: string;
  latlng: [number, number];
  region: string;
  value: string;
};

export interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
export interface CategoryWrapperProps {
  icon: IconType;
  label: string;
  // selected: boolean;
}
export interface CategorySelectionProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

export interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
}

export interface ModalStoreType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}
export interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  user?: SafeUser | null;
}

export interface HeartButtonProps {
  listingId: string;
  user?: SafeUser | null;
}

export interface ListingParams {
  listingId?: string;
}

export interface FavoritesProps {
  listingId: string;
  user?: SafeUser | null;
}
export interface ListingByIdProps {
  listingId?: string;
}

export interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  user?: SafeUser | null;
}

export interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  user?: SafeUser | null;
}

export interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        name: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

export interface ListingCategoryProps {
  icon: IconType;
  name: string;
  description: string;
}

export interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export interface CalendaProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export interface TripsClientProps {
  reservations: SafeReservation[];
  user?: SafeUser | null;
}

export interface IParamReservationsProps {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export interface DeleteParams {
  reservationId?: string;
}

export interface ReservationsClientProps {
  reservations: SafeReservation[];
  user?: SafeUser | null;
}

export interface FavoriteClientProps {
  favorites: SafeListing[];
  user?: SafeUser | null;
}
export interface PropertiesSearchParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export interface PropertiesClientProps {
  listings: SafeListing[];
  user?: SafeUser | null;
}

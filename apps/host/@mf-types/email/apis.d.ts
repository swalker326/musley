
    export type RemoteKeys = 'email/RemoteEntry';
    type PackageType<T> = T extends 'email/RemoteEntry' ? typeof import('email/RemoteEntry') :any;
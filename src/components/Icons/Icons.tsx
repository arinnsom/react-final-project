import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const SearchIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <path
      d="M11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10 10L14.5 14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" />
  </svg>
);

export const GenresIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147 12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17 21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z" />
  </svg>
);

export const EmailIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z" />
  </svg>
);

export const KeyIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({
  size = 20,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 40,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({
  size = 20,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const HeartFilledIcon: React.FC<IconProps> = ({
  size = 20,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({
  size = 32,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({
  size = 32,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({
  size = 16,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 15"
    fill="currentColor"
    className={className}
    xmlns="http://w3.org"
    {...props}
  >
    <path d="M7.60847 11.84L2.90617 14.4721L3.95639 9.1866L0 5.52787L5.35136 4.89337L7.60847 0L9.86554 4.89337L15.2169 5.52787L11.2605 9.1866L12.3107 14.4721L7.60847 11.84Z" />
  </svg>
);

export const VkIcon: React.FC<IconProps> = ({
  size = 19,
  className = "",
  ...props
}) => {
  const height = (size * 10) / 19;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 19 10"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2795 0.699502C18.4182 0.30493 18.2795 0.0179495 17.6649 0.0179495H15.6228C15.1073 0.0179495 14.8694 0.269031 14.7306 0.538115C14.7306 0.538115 13.6798 2.8339 12.2127 4.32255C11.7369 4.75302 11.5188 4.89651 11.2611 4.89651C11.1223 4.89651 10.9439 4.75302 10.9439 4.35845V0.681552C10.9439 0.215235 10.7853 0 10.3491 0H7.13733C6.82011 0 6.62187 0.215235 6.62187 0.430471C6.62187 0.878891 7.3554 0.986482 7.43471 2.24199V4.96826C7.43471 5.56017 7.31578 5.66776 7.05802 5.66776C6.36412 5.66776 4.67893 3.35402 3.66781 0.717451C3.46951 0.197286 3.27128 0 2.75583 0H0.693898C0.0991342 0 0 0.251134 0 0.520165C0 1.00443 0.693898 3.44371 3.2316 6.67219C4.91685 8.87828 7.31578 10.0621 9.4768 10.0621C10.7853 10.0621 10.9439 9.79302 10.9439 9.34465V7.67662C10.9439 7.1385 11.0628 7.04886 11.4792 7.04886C11.7766 7.04886 12.3119 7.1923 13.5212 8.25053C14.909 9.50604 15.147 10.08 15.9202 10.08H17.9623C18.557 10.08 18.8346 9.81097 18.676 9.29081C18.4975 8.77069 17.8235 8.0174 16.9511 7.12056C16.4753 6.61839 15.7616 6.06238 15.5435 5.7933C15.2461 5.43463 15.3254 5.29113 15.5435 4.96826C15.5237 4.96826 18.0217 1.77568 18.2795 0.699502Z"
      />
    </svg>
  );
};

export const OkIcon: React.FC<IconProps> = ({
  size = 11,
  className = "",
  ...props
}) => {
  const height = (size * 18) / 11;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 11 18"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.24714 12.9023L9.90059 15.464C10.4442 15.9876 10.4442 16.838 9.90059 17.3622C9.35757 17.8863 8.47745 17.8863 7.935 17.3622L5.32614 14.8449L2.71955 17.3622C2.44776 17.624 2.09162 17.755 1.73548 17.755C1.3799 17.755 1.02433 17.624 0.752539 17.3622C0.209523 16.838 0.209523 15.9881 0.751971 15.464L3.4057 12.9023C2.43952 12.6899 1.50771 12.3203 0.649445 11.8006C-7.1612e-05 11.4052 -0.195182 10.577 0.214067 9.94953C0.622181 9.32118 1.48044 9.13202 2.13109 9.52734C4.07425 10.7073 6.57746 10.7075 8.52175 9.52734C9.1724 9.13202 10.0304 9.32118 10.4393 9.94953C10.8486 10.5765 10.6529 11.4052 10.0034 11.8006C9.14514 12.3209 8.21332 12.6899 7.24714 12.9023Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.568359 4.58207C0.568359 7.10805 2.69725 9.16277 5.31492 9.16277C7.93315 9.16277 10.0615 7.10805 10.0615 4.58207C10.0615 2.05527 7.93315 0 5.31492 0C2.69725 0 0.568359 2.05527 0.568359 4.58207ZM7.28015 4.58158C7.28015 3.53544 6.3986 2.68477 5.31484 2.68477C4.23193 2.68477 3.34953 3.53544 3.34953 4.58158C3.34953 5.6269 4.23193 6.47812 5.31484 6.47812C6.3986 6.47812 7.28015 5.6269 7.28015 4.58158Z"
      />
    </svg>
  );
};

export const YoutubeIcon: React.FC<IconProps> = ({
  size = 15,
  className = "",
  ...props
}) => {
  const height = (size * 11) / 15;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 15 11"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.681 0.329597C14.3419 0.510956 14.8624 1.04533 15.039 1.72393C15.36 2.95382 15.36 5.52 15.36 5.52C15.36 5.52 15.36 8.08609 15.039 9.31607C14.8624 9.99467 14.3419 10.529 13.681 10.7105C12.4832 11.04 7.68 11.04 7.68 11.04C7.68 11.04 2.87677 11.04 1.67895 10.7105C1.01804 10.529 0.497542 9.99467 0.320902 9.31607C0 8.08609 0 5.52 0 5.52C0 5.52 0 2.95382 0.320902 1.72393C0.497542 1.04533 1.01804 0.510956 1.67895 0.329597C2.87677 0 7.68 0 7.68 0C7.68 0 12.4832 0 13.681 0.329597ZM6.23997 3.36023V8.16023L10.08 5.76033L6.23997 3.36023Z"
      />
    </svg>
  );
};

export const TelegramIcon: React.FC<IconProps> = ({
  size = 17,
  className = "",
  ...props
}) => {
  const height = (size * 14) / 17;

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 17 14"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.248522 6.33899C1.93187 5.41175 3.81095 4.63787 5.56667 3.86003C8.58719 2.58599 11.6197 1.33403 14.6828 0.168471C15.2788 -0.0301292 16.3496 -0.224349 16.4546 0.658851C16.3972 1.90901 16.1606 3.15185 15.9984 4.39469C15.5866 7.12781 15.1107 9.85157 14.6466 12.5757C14.4867 13.4831 13.35 13.9528 12.6227 13.3721C10.8748 12.1915 9.11339 11.0223 7.38779 9.81425C6.82253 9.23987 7.34669 8.41505 7.85153 8.00489C9.29117 6.58613 10.8179 5.38073 12.1823 3.88865C12.5504 2.99987 11.4629 3.74891 11.1043 3.97841C9.13337 5.33657 7.21073 6.77765 5.13281 7.97129C4.07141 8.55557 2.83433 8.05625 1.77341 7.73021C0.822158 7.33637 -0.571774 6.93959 0.248426 6.33905L0.248522 6.33899Z" />
    </svg>
  );
};

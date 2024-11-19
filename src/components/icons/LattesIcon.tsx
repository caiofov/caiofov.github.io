import { Icon } from "@tabler/icons-react";

export const LattesIcon: Icon = (props) => {
  // Garantir que o stroke seja uma string
  let { stroke, size, ...restProps } = props;

  stroke = typeof stroke === "number" ? String(stroke) : stroke;

  return (
    <svg
      className="tabler-icon tabler-icon-lattes"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      strokeWidth="40"
      fill="none"
      stroke={stroke ?? "currentColor"}
      {...restProps}
    >
      <path
        d="m97.871854 434.73261c-46.337391-94.94819-73.906252-152.28892-73.906252-153.71232 0-2.32214 2.831558-1.99974 30.672084 3.45957 48.965204 9.61389 75.126384 12.32631 118.735104 12.34258 57.69707.0159 104.6807-9.1222 141.18473-27.4842 19.31194-9.71476 30.92555-18.32755 40.43708-29.99337 11.716-14.37824 15.47977-24.28004 15.61512-40.94646.11867-15.85237-2.01801-24.21167-11.19035-43.60874-3.62892-7.66433-6.8168-16.46265-7.12098-19.54964-.47493-4.96814-.0684-5.68084 3.59445-6.10361 8.00292-.94846 47.50732 37.40224 62.05491 60.24069 25.07592 39.38574 27.11161 81.99337 5.88408 123.1953-13.03903 25.31314-27.44972 42.82712-51.57723 62.73362-40.09844 33.06211-86.70754 56.08608-151.06833 74.63514-34.5707 9.97024-90.47131 22.05883-101.98402 22.05883-2.44075 0-7.02006-8.00296-21.295953-37.28315l-.03402.0151"
        transform="translate(5, 35) scale(0.98,0.95)"
      />
      <path
        d="m110.77501 281.61191c-45.015874-5.83193-82.790737-10.90244-83.96064-11.27504-1.999745-.64427-9.154693-24.5158-13.190597-43.94683-1.016871-4.91744-2.509183-17.93873-3.322753-28.9583-3.6303611-49.17042 7.068779-83.16526 35.739145-113.734503 48.542406-51.712057 152.475965-58.003206 269.736485-16.327779 20.58274 7.324215 28.75504 12.410983 24.975 15.580668-2.79708 2.339846-21.75315 2.305883-54.50916-.102387-51.20464-3.763759-90.18335 3.357226-110.27491 20.176211-30.58742 25.60158-25.92345 81.72365 13.53071 162.68196 4.27316 8.76586 8.57881 17.34466 9.56318 19.09094 2.28966 4.01773.62803 7.74899-3.3572 7.56196-1.69755-.0813-39.91486-4.91203-84.92926-10.74592"
        transform="translate(-20,-20)"
      />
      <path
        d="m261.79115 237.56409c-35.92814-6.45997-68.22691-28.7388-78.65437-54.22127-5.00209-12.24165-4.76437-28.2131.57585-37.77483 4.83279-8.64723 17.3107-18.64993 28.48481-22.83843 18.59924-6.96791 51.17019-4.18853 74.90688 6.40975 22.53229 10.05487 42.50672 27.73816 49.93183 44.18457 9.52925 21.10841 1.59321 44.65955-18.82072 55.90059-13.5307 7.44285-39.82676 11.32572-56.44249 8.34109h.0181z"
        transform="scale(0.98,0.98)"
      />
    </svg>
  );
};

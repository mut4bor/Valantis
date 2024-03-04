export type SidebarContainerProps = {
  children: React.ReactNode;
  title: {
    text: string;
    onClick: () => void;
    active: boolean;
  };
};

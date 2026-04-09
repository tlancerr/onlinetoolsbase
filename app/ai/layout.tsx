import type { ReactNode } from "react";
import styles from "./aihub.module.css";

export default function AiSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.aiHub}>{children}</div>;
}

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
type GoBackProps = {
  path: string;
};

export default function Goback({ path }: GoBackProps) {
  return (
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href={path}
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
      </div>
    </section>
  );
}

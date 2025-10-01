"use client";

import { useState } from "react";
import useGetFeedbacks from "@/utils/hooks/useGetFeedback";

export default function Home() {
  const { feedbacks, isLoading, err, fetchFeedbacks } = useGetFeedbacks();
  const [data, setData] = useState<FeedbackType>({
    name: "",
    email: "",
    text: "",
  });

  const [error, setError] = useState<ErrorType>({
    email: "",
    common: "",
    name: "",
    text: "",
  });

  const submit_feedback = async () => {
    if (data.name.trim() === "") {
      setError((p) => ({ ...p, name: "Name can't be empty!" }));
      return;
    }
    if (data.email.trim() === "") {
      setError((p) => ({ ...p, email: "Email can't be empty!" }));
      return;
    }
    if (data.text.trim() === "") {
      setError((p) => ({ ...p, text: "Feedback field can't be empty!" }));
      return;
    }
    const fd = new FormData();
    fd.append("data", JSON.stringify(data));
    const res = await fetch("/api/feedback", {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.flag) {
        await fetchFeedbacks();
        setError({ name: "", common: "", email: "", text: "" });
        setData({ name: "", email: "", text: "" });
      } else {
      }
    } else {
      setError((p) => ({ ...p, common: "form submission error!" }));
    }
  };
  return (
    <div>
      <div className="mt-10 w-full sm:w-4/5 md:w-3/5 max-w-[800px] mx-auto">
        <div className="card p-2 ">
          <h1 className="text-center">FeedBack Form</h1>

          {error.common && (
            <p className="bg-red-900 my-1 text-white p-1 rounded-sm">
              {error.common}
            </p>
          )}
          <div className="my-1">
            <h1>Name</h1>
            <input
              onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
              value={data.name}
              className="w-full form-input"
              type="text"
              name=""
              id=""
            />
            {error.name && (
              <p className="bg-red-900 mt-1 text-white p-1 rounded-sm">
                {error.name}
              </p>
            )}
          </div>
          <div className="my-1">
            <h1>Email</h1>
            <input
              onChange={(e) =>
                setData((p) => ({ ...p, email: e.target.value }))
              }
              value={data.email}
              className="w-full form-input"
              type="text"
              name=""
              id=""
            />
            {error.email && (
              <p className="bg-red-900 mt-1 text-white p-1 rounded-sm">
                {error.email}
              </p>
            )}
          </div>

          <div className="my-1">
            <h1>Feedback</h1>
            <input
              onChange={(e) => setData((p) => ({ ...p, text: e.target.value }))}
              value={data.text}
              className="w-full form-input"
              type="text"
              name=""
              id=""
            />
            {error.text && (
              <p className="bg-red-900 mt-1 text-white p-1 rounded-sm">
                {error.text}
              </p>
            )}
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={submit_feedback}
              className="btn btn-primary px-4 py-1 rounded-sm"
              type="button"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="mt-10">
          <div>
            {isLoading && (
              <p className="fixed top-1/2 left-1/2 -translate-x-1/2">
                Loading ...
              </p>
            )}
          </div>
          <div>
            {err && (
              <p className="fixed top-1/2 left-1/2 -translate-x-1/2 p-1 bg-red-900 text-white">
                {err}
              </p>
            )}
          </div>

          <div>
            {feedbacks
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((fb) => (
                <div key={fb.id} className="page p-2 rounded-md mt-3">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="font-bold">{fb.name}</h1>
                    </div>
                    <div className="space-x-3">
                      <span className="px-2 bg-violet-700 rounded-sm">
                        {get_date(fb.createdAt)}
                      </span>
                      <span className="px-2 bg-sky-700 rounded-sm">
                        {get_time(fb.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div>{fb.text}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const get_date = (d: Date) => {
  const date = new Date(d);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
const get_time = (d: Date) => {
  const date = new Date(d);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export type FeedbackType = {
  name: string;
  email: string;
  text: string;
};

export type ErrorType = FeedbackType & {
  common: string;
};

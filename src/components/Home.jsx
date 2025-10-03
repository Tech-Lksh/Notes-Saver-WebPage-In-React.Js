import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes || []); // adjust slice name if different

  // When pasteId changes, prefill the form if paste exists
  useEffect(() => {
    if (pasteId) {
      const existing = pastes.find((p) => p._id === pasteId);
      if (existing) {
        setTitle(existing.title || "");
        setValue(existing.value || "");
      } else {
        // If not found, clear fields (or keep them — your choice)
        setTitle("");
        setValue("");
      }
    } else {
      // If no pasteId in URL, clear fields for creation
      setTitle("");
      setValue("");
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
      title: title.trim(),
      value: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Updation — dispatch in shape: { id, newData }
      dispatch(updateToPastes({ id: paste._id, newData: paste }));
    } else {
      // Creation
      dispatch(addToPastes(paste));
    }

    // After creation or updation, clear form and remove query param
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row place-content-between">
        <input
          className="pl-3 mt-2 rounded-2xl w-[67%]"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <button
          className="p-3 mt-2 rounded-lg"
          onClick={createPaste}
          disabled={!title.trim() && !value.trim()}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-lg p-3 mt-4 min-w-[500px]"
          value={value}
          placeholder="Enter content here..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={20}
          cols={40}
        />
      </div>
    </div>
  );
};

export default Home;

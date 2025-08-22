import React, { useState } from "react";
import { X, Plus, Camera, ArrowUp, ChevronDown } from "lucide-react";

interface NewCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCharacter: (characterData: any) => void;
}

const NewCharacterModal: React.FC<NewCharacterModalProps> = ({
  isOpen,
  onClose,
  onCreateCharacter,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    voice: "",
    description: "",
    appearance: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onCreateCharacter(formData);
      setFormData({
        name: "",
        gender: "",
        voice: "",
        description: "",
        appearance: "",
      });
      onClose();
    }
  };

  const handleGenerateCharacter = () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-[1116px] h-[80vh] p-6 flex flex-col gap-10 rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#171717" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 w-full">
          <h2
            className="flex-1 text-xl font-normal leading-6"
            style={{
              color: "rgba(243, 243, 243, 1)",
              fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Create character
          </h2>
          <div className="flex justify-end items-center gap-3 flex-1">
            <button
              onClick={onClose}
              className="flex items-center justify-center p-3 gap-2 rounded-lg border border-brand-primary bg-brand-primary hover:bg-opacity-90 transition-colors"
            >
              <X size={16} className="text-text-primary" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {/* Content - 2 Column Layout */}
        <div className="flex justify-center items-stretch gap-12 flex-1 w-full min-h-0">
          {/* Left Column - Forms + Generate Button */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-none flex-1">
              {/* Name Field */}
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-base font-normal leading-6 w-full"
                  style={{
                    color: "rgba(243, 243, 243, 1)",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Name your character
                </label>
                <div
                  className="flex items-center min-w-[240px] px-4 py-3 w-full rounded-lg"
                  style={{ backgroundColor: "#232424" }}
                >
                  <input
                    type="text"
                    placeholder="Enter a full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="flex-1 bg-transparent border-0 outline-none text-base font-normal leading-4"
                    style={{
                      color: "rgba(179, 179, 179, 1)",
                      fontFamily:
                        "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  />
                </div>
                <div
                  className="text-base font-normal italic leading-6 w-full"
                  style={{
                    color: "rgba(179, 179, 179, 1)",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Note: The name you choose will be how the character is
                  referred to in scripts, so choose a name that helps keep our
                  character list organized
                </div>
              </div>

              {/* Gender and Voice Row */}
              <div className="flex items-start gap-6 w-full">
                <div className="flex flex-col gap-0 flex-1">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-base font-normal leading-6 w-full"
                      style={{
                        color: "rgba(243, 243, 243, 1)",
                        fontFamily:
                          "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Gender
                    </label>
                    <div
                      className="flex items-center min-w-[240px] px-4 py-3 w-full rounded-lg relative"
                      style={{ backgroundColor: "#232424" }}
                    >
                      <select
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="flex-1 bg-transparent border-0 outline-none text-base font-normal leading-4 appearance-none pr-6"
                        style={{
                          color: "rgba(179, 179, 179, 1)",
                          fontFamily:
                            "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        <option value="">Select a gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "#F3F3F3" }}
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-0 flex-1">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-base font-normal leading-6 w-full"
                      style={{
                        color: "rgba(243, 243, 243, 1)",
                        fontFamily:
                          "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                      }}
                    >
                      Voice
                    </label>
                    <div
                      className="flex items-center min-w-[240px] px-4 py-3 w-full rounded-lg relative"
                      style={{ backgroundColor: "#232424" }}
                    >
                      <select
                        value={formData.voice}
                        onChange={(e) =>
                          handleInputChange("voice", e.target.value)
                        }
                        className="flex-1 bg-transparent border-0 outline-none text-base font-normal leading-4 appearance-none pr-6"
                        style={{
                          color: "rgba(179, 179, 179, 1)",
                          fontFamily:
                            "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        <option value="">Select a voice</option>
                        <option value="young-adult">Young Adult</option>
                        <option value="mature">Mature</option>
                        <option value="child">Child</option>
                        <option value="elderly">Elderly</option>
                      </select>
                      <ChevronDown
                        size={16}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: "#F3F3F3" }}
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  className="text-base font-normal leading-6 w-full"
                  style={{
                    color: "rgba(243, 243, 243, 1)",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Describe the character
                </label>
                <div
                  className="flex items-start min-w-[240px] min-h-[150px] px-4 py-3 w-full rounded-lg"
                  style={{ backgroundColor: "#232424" }}
                >
                  <textarea
                    placeholder="John is a funny.."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="flex-1 bg-transparent border-0 outline-none resize-none text-base font-normal leading-6 scrollbar-none"
                    style={{
                      color: "rgba(179, 179, 179, 1)",
                      fontFamily:
                        "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                      minHeight: "130px",
                    }}
                  />
                </div>
                <div
                  className="text-base font-normal leading-6 w-full"
                  style={{
                    color: "rgba(179, 179, 179, 1)",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  What are their quirks, goals, and biggest secrets? What
                  defining moments from their past shaped who they are today?
                </div>
              </div>

              {/* Appearance Field */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  className="text-base font-normal leading-6"
                  style={{
                    color: "rgba(243, 243, 243, 1)",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  Upload photo or describe appearance
                </label>
                <div
                  className="flex flex-col p-2 gap-2.5 w-full rounded-2xl"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    minHeight: "300px",
                  }}
                >
                  <div className="flex flex-col gap-2 w-full flex-1">
                    <div
                      className="flex flex-col min-w-[240px] px-4 py-3 flex-1 w-full rounded-lg"
                      style={{ backgroundColor: "#232424" }}
                    >
                      <textarea
                        placeholder="A confident young woman with braided hair and expressive eyes. She wears a loose linen shirt and carries a satchel filled with old maps. Her voice is calm but assertive, and she often pauses before speaking, as if weighing every word."
                        value={formData.appearance}
                        onChange={(e) =>
                          handleInputChange("appearance", e.target.value)
                        }
                        className="flex-1 w-full bg-transparent border-0 outline-none resize-none text-base font-normal leading-6 scrollbar-none"
                        style={{
                          color: "rgba(179, 179, 179, 1)",
                          fontFamily:
                            "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                          minHeight: "200px",
                        }}
                      />
                      <div className="flex justify-between items-end mt-auto w-full">
                        <div className="flex items-center gap-1.5">
                          <button className="flex items-center justify-center p-2 gap-2 rounded-lg hover:bg-brand-primary transition-colors">
                            <Plus
                              size={16}
                              strokeWidth={1.6}
                              style={{ color: "#F3F3F3" }}
                            />
                          </button>
                          <button
                            className="flex items-center justify-center p-2 gap-2 rounded-lg"
                            style={{
                              background: "rgba(0, 0, 0, 0.10)",
                              backdropFilter: "blur(2px)",
                            }}
                          >
                            <Camera
                              size={16}
                              strokeWidth={1.6}
                              style={{ color: "#F5F5F5" }}
                            />
                          </button>
                        </div>
                        <button className="flex items-center justify-center p-2 gap-2 rounded-lg hover:bg-brand-primary transition-colors">
                          <ArrowUp
                            size={16}
                            strokeWidth={1.6}
                            style={{ color: "#F3F3F3" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button - Inside scrollable area at the bottom */}
              <div className="pt-4">
                <button
                  onClick={handleGenerateCharacter}
                  className="inline-flex items-center justify-center p-3 gap-2 rounded-lg border transition-colors hover:bg-opacity-90 self-start"
                  style={{
                    borderColor: "rgba(118, 118, 118, 1)",
                    backgroundColor: "rgba(227, 227, 227, 1)",
                    color: "rgba(30, 30, 30, 1)",
                    fontFamily:
                      "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  Bring me to life!
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preview + Create Button */}
          <div className="flex flex-col flex-1 h-full">
            {/* Preview */}
            <div
              className="flex flex-col justify-center items-center flex-1 rounded-2xl relative"
              style={{ backgroundColor: "#232424" }}
            >
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-primary"></div>
                  <span className="text-text-primary text-base">
                    Generating character...
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 w-36">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path
                      d="M10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42ZM10 42L32 20L42 30M20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17Z"
                      stroke="#B3B3B3"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    className="text-center text-base font-normal leading-6 w-full"
                    style={{
                      color: "rgba(179, 179, 179, 1)",
                      fontFamily:
                        "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                  >
                    Preview goes here
                  </div>
                </div>
              )}
            </div>

            {/* Create Button - At bottom of right column */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!formData.name.trim()}
                className="flex items-center justify-center p-3 gap-2 rounded-lg border transition-colors hover:bg-opacity-90 disabled:opacity-50"
                style={{
                  borderColor: "rgba(118, 118, 118, 1)",
                  backgroundColor: "rgba(227, 227, 227, 1)",
                  color: "rgba(30, 30, 30, 1)",
                  fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "16px",
                }}
              >
                Create character
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCharacterModal;

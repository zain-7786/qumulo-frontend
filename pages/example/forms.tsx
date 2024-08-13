import React, { useEffect, useState } from "react";

import { Input, Label, Select } from "@roketid/windmill-react-ui";
import PageTitle from "example/components/Typography/PageTitle";
import SectionTitle from "example/components/Typography/SectionTitle";
import { Time } from "@internationalized/date";
import Layout from "example/containers/Layout";
import { TimeInput } from "@nextui-org/date-input";
import { Axios } from "example/components/Services/axios";

/**
 * Edit Snapshot Policy component.
 *
 * This component allows users to edit an existing snapshot policy.
 *
 * @example
 * <EditSnapshotPolicy />
 */
function EditSnapshotPolicy() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [deleteOption, setDeleteOption] = useState<"Never" | "Automatically">(
    "Never"
  );
  const [policyId, setPolicyId] = useState<number>();
  const [deleteValue, setDeleteValue] = useState<number>(0);
  const [timeUnit, setTimeUnit] = useState<"days" | "months">("days");
  const [policyName, setPolicyName] = useState<string>("");
  const [applyToDirectory, setApplyToDirectory] = useState<string>("");
  const [timeZone, settimeZone] = useState<string>("");
  const [enableLockedSnapshots, setEnableLockedSnapshots] =
    useState<boolean>(false);
  const [enablePolicy, setEnablePolicy] = useState<boolean>(false);
  const [scheduleType, setScheduleType] = useState<"Daily" | "Weekly">("Daily");
  const [snapshotTime, setSnapshotTime] = useState<Time>(new Time(11, 45));

  useEffect(() => {
    fetchPolicyData();
  }, []);

  /**
   * Fetches policy data from the API.
   *
   * @async
   */
  const fetchPolicyData = async () => {
    try {
      Axios.get("/SnapshotPolicy").then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const policy = data[0];
          setPolicyId(policy.id);
          setPolicyName(policy.policy_name);
          setApplyToDirectory(policy.project_directory);
          setScheduleType(policy.schedule_type as "Daily" | "Weekly");
          setSnapshotTime(
            new Time(
              parseInt(policy.snap_shot_time.split(":")[0], 10),
              parseInt(policy.snap_shot_time.split(":")[1], 10)
            )
          );
          settimeZone(policy.time_zone);
          setSelectedDays(
            policy.snap_shot_days === "Every Day"
              ? ["EveryDay"]
              : policy.snap_shot_days.split(",")
          );
          setDeleteOption(policy.snap_shot_delete_interval);
          // setDeleteValue(policy.enable_locked_snap_shots);
          // setTimeUnit("days");
          setEnableLockedSnapshots(policy.enable_locked_snap_shots);
          setEnablePolicy(policy.enable_policy);
        }
      });
    } catch (error) {
      console.error("Error fetching policy data:", error);
    }
  };

  /**
   * Updates the policy.
   *
   * @async
   */
  const handleUpdatePolicy = async () => {
    try {
      const updatedPolicy = {
        projectDirectory: applyToDirectory,
        scheduleType: scheduleType,
        snapShotTime: `${snapshotTime.hour}:${snapshotTime.minute}`,
        timeZone: timeZone,
        snapShotDays: selectedDays.join(","),
        snapShotDeleteInterval: deleteOption,
        enableLockedSnapShots: enableLockedSnapshots,
        enablePolicy: enablePolicy,
      };
      await Axios.put(`/SnapshotPolicy/${policyId}`, updatedPolicy);
      alert("Policy updated successfully");
      fetchPolicyData();
    } catch (error) {
      console.error("Error updating policy:", error);
      alert("Failed to update policy");
    }
  };

  /**
   * Handles checkbox change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "EveryDay") {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.includes(value)
          ? prevSelectedDays.filter((day) => day !== value)
          : [...prevSelectedDays, value]
      );
    } else {
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.includes(value)
          ? prevSelectedDays.filter((day) => day !== value)
          : [...prevSelectedDays, value]
      );
    }
  };

  /**
   * Handles delete option change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleDeleteOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeleteOption(event.target.value as "Never" | "Automatically");
  };

  /**
   * Handles delete value change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleDeleteValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeleteValue(Number(event.target.value));
  };

  /**
   * Handles time unit change event.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  const handleTimeUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTimeUnit(event.target.value as "days" | "months");
  };

  /**
   * Handles policy name change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handlePolicyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPolicyName(event.target.value);
  };

  /**
   * Handles apply to directory change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleApplyToDirectoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setApplyToDirectory(event.target.value);
  };

  /**
   * Handles enable locked snapshots change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleEnableLockedSnapshotsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnableLockedSnapshots(event.target.checked);
  };

  /**
   * Handles enable policy change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleEnablePolicyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnablePolicy(event.target.checked);
  };

  /**
   * Handles schedule type change event.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  const handleScheduleTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setScheduleType(event.target.value as "Daily" | "Weekly");
  };

  /**
   * Handles snapshot time change event.
   *
   * @param {Time} value
   */
  const handleSnapshotTimeChange = (value: Time) => {
    setSnapshotTime(value);
  };

  /**
   * Handles form submission.
   *
   * @param {React.FormEvent} event
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log({
      policyName,
      applyToDirectory,
      schedule: {
        selectedDays,
        deleteOption,
        deleteValue,
        timeUnit,
      },
      enableLockedSnapshots,
      enablePolicy,
    });
  };

  const isEveryDaySelected = selectedDays.includes("EveryDay");

  return (
    <Layout>
      <PageTitle>Edit Snapshot Policy</PageTitle>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <Label>
            <SectionTitle>Policy Name</SectionTitle>
            <Input
              className="mt-1"
              placeholder="ProjectX_Daily"
              value={policyName}
              onChange={handlePolicyNameChange}
            />
          </Label>
          <Label className="pt-3">
            <SectionTitle>Apply To Directory</SectionTitle>
            <Input
              className="mt-1"
              placeholder="Production/ProjectX"
              value={applyToDirectory}
              onChange={handleApplyToDirectoryChange}
            />
          </Label>
        </div>
        <Label>
          <SectionTitle>Run Policy on the Following Scehdule</SectionTitle>
        </Label>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="mt-4 flex items-center justify-between">
            <span>Select Schedule Type</span>
            <Label className="flex-1 ml-4">
              <Select
                className="mt-1"
                value={scheduleType}
                onChange={handleScheduleTypeChange}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </Select>
            </Label>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span>Set to Time Zone</span>
            <Label className="flex-1 ml-4">
              <span>{timeZone}</span>
            </Label>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span>Take a Snapshot at</span>
            <Label className="flex-1 ml-4">
              <TimeInput
                label=""
                labelPlacement={undefined}
                defaultValue={snapshotTime}
                onChange={handleSnapshotTimeChange}
                description="inside-left"
              />
            </Label>
          </div>

          <div className="mt-4">
            <span className="block mb-2">On the Following Day(s)</span>
            <Label className="block mb-2">
              <Input
                type="checkbox"
                value="EveryDay"
                checked={isEveryDaySelected}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2">Every Day</span>
            </Label>
            <div className="flex flex-wrap mt-2">
              {["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"].map((day) => (
                <Label
                  key={day}
                  className={`ml-6 ${
                    isEveryDaySelected ? "disabledRadio" : ""
                  } block flex items-center`}
                >
                  <Input
                    type="checkbox"
                    value={day}
                    checked={selectedDays.includes(day)}
                    onChange={handleCheckboxChange}
                    disabled={isEveryDaySelected}
                  />
                  <span className="ml-2">{day}</span>
                </Label>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="block mb-2">Delete Each Snapshot</span>
            <div className="flex items-center mb-2">
              <Label className="mr-4">
                <Input
                  type="radio"
                  value="Never"
                  checked={deleteOption === "Never"}
                  onChange={handleDeleteOptionChange}
                />
                <span className="ml-2">Never</span>
              </Label>
              <Label>
                <Input
                  type="radio"
                  value="Automatically"
                  checked={deleteOption === "Automatically"}
                  onChange={handleDeleteOptionChange}
                />
                <span className="ml-2">Automatically</span>
              </Label>
            </div>
            {deleteOption === "Automatically" && (
              <div className="flex items-center">
                <Input
                  type="number"
                  className="mr-2"
                  value={deleteValue}
                  onChange={handleDeleteValueChange}
                  min={0}
                />
                <Select
                  className="ml-2"
                  value={timeUnit}
                  onChange={handleTimeUnitChange}
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                </Select>
              </div>
            )}
          </div>
        </div>
        <div>
          <span className="ml-0">Snapshot Locking</span>
          <Label>
            <span className="ml-0">
              Locked snapshots cannot be deleted before the deletion schedule
              expires. For this feature to be available, snapshots must be set
              to automatically delete.
            </span>
          </Label>
        </div>
        <div>
          <Label className="mt-0 pt-4" check>
            <Input
              type="checkbox"
              checked={enableLockedSnapshots}
              onChange={handleEnableLockedSnapshotsChange}
            />
            <span className="ml-2">Enable locked snapshots</span>
          </Label>
        </div>
        <div>
          <Label className="mt-6" check>
            <Input
              type="checkbox"
              checked={enablePolicy}
              onChange={handleEnablePolicyChange}
            />
            <span className="ml-2">Enable Policy</span>
          </Label>
        </div>
        <div className="mt-6 pb-5">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleUpdatePolicy}
          >
            Save Policy
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default EditSnapshotPolicy;

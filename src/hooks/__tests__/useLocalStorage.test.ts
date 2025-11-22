import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string): string | null => store[key] || null,
      setItem: (key: string, value: string): void => {
        store[key] = value.toString();
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
      clear: (): void => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns initial value when no stored value exists", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    expect(result.current[0]).toBe("initial");
  });

  it("returns stored value if it exists", () => {
    localStorageMock.setItem("test-key", JSON.stringify("stored value"));

    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    expect(result.current[0]).toBe("stored value");
  });

  it("updates localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(localStorageMock.getItem("test-key")).toBe(JSON.stringify("new value"));
  });

  it("works with objects", () => {
    interface TestObject {
      name: string;
      age: number;
    }

    const initialObject: TestObject = { name: "John", age: 30 };
    const { result } = renderHook(() => useLocalStorage<TestObject>("test-key", initialObject));

    expect(result.current[0]).toEqual(initialObject);

    const newObject: TestObject = { name: "Jane", age: 25 };
    act(() => {
      result.current[1](newObject);
    });

    expect(result.current[0]).toEqual(newObject);
    expect(JSON.parse(localStorageMock.getItem("test-key")!)).toEqual(newObject);
  });

  it("works with arrays", () => {
    const initialArray = [1, 2, 3];
    const { result } = renderHook(() => useLocalStorage<number[]>("test-key", initialArray));

    expect(result.current[0]).toEqual(initialArray);

    const newArray = [4, 5, 6];
    act(() => {
      result.current[1](newArray);
    });

    expect(result.current[0]).toEqual(newArray);
    expect(JSON.parse(localStorageMock.getItem("test-key")!)).toEqual(newArray);
  });

  it("supports functional updates like useState", () => {
    const { result } = renderHook(() => useLocalStorage<number>("counter", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prev) => prev + 5);
    });

    expect(result.current[0]).toBe(6);
  });

});

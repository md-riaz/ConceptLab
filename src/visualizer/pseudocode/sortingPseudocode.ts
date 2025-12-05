export const bubbleSortPseudocode = `function bubbleSort(arr):
    n = length of arr
    for i from 0 to n-1:
        for j from 0 to n-i-1:
            if arr[j] > arr[j+1]:
                swap arr[j] and arr[j+1]
    return arr`;

export const insertionSortPseudocode = `function insertionSort(arr):
    for i from 1 to length(arr)-1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j = j - 1
        arr[j+1] = key
    return arr`;

export const pseudocodeMap: Record<string, string> = {
  'bubble-sort': bubbleSortPseudocode,
  'insertion-sort': insertionSortPseudocode,
};

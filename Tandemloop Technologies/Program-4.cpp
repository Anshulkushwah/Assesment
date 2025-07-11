#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;

    vector<int> input(n);
    cout << "Enter " << n << " numbers: ";
    
    for (int i = 0; i < n; ++i) {
        cout<<"Enter "<<i+1<<"th number"<<endl;
        cin >> input[i];
    }

    map<int, int> result;

    for (int i = 1; i <= 9; ++i) {
        result[i] = 0;
    }

    for (int num : input) {
        for (int i = 1; i <= 9; ++i) {
            if (num % i == 0) {
                result[i]++;
            }
        }
    }

    cout << "Output:\n";
    for (auto pair : result) {
        cout << pair.first << ": " << pair.second << endl;
    }

    return 0;
}

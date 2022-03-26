#include "bp.h"

ParitateBidimensionala::ParitateBidimensionala() : matrice(), dim(0){};

bool ParitateBidimensionala::multipluDe7(int numar)
{
    if (numar % 7 != 0)
        return false;
    return true;
}

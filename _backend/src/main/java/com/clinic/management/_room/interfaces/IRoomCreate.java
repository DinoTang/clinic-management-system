package com.clinic.management._room.interfaces;

import com.clinic.management._room.dtos.ProfileCreateRequest;
import com.clinic.management._room.entities.Room;
import java.util.List;

public interface IRoomCreate {
    Room create(ProfileCreateRequest request);
}
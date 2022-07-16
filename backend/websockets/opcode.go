package websockets

type Opcode struct {
	opcode byte
	name   string
}

type Codex struct {
	opcodeMap map[int]Opcode
}

var (
	Calls *Codex
)

func InitCodex() {
	Calls = &Codex{}
	Calls.opcodeMap = make(map[int]Opcode)
	Calls.opcodeMap[0x01] = Opcode{
		opcode: 0x1,
		name:   "Text",
	}
	Calls.opcodeMap[0x02] = Opcode{
		opcode: 0x2,
		name:   "Binary",
	}
	Calls.opcodeMap[0x08] = Opcode{
		opcode: 0x8,
		name:   "Close",
	}
	Calls.opcodeMap[0x09] = Opcode{
		opcode: 0x9,
		name:   "Ping",
	}
	Calls.opcodeMap[0x0A] = Opcode{
		opcode: 0xA,
		name:   "Pong",
	}
}

func (c Codex) Exists(opcode byte) bool {
	_, ok := c.opcodeMap[int(opcode)]
	return ok
}

func (c Codex) Get(opcode byte) Opcode {
	return c.opcodeMap[int(opcode)]
}

func (o Opcode) GetName() string {
	return o.name
}

func (o Opcode) GetCode() byte {
	return o.opcode
}
